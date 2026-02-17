import { blake3 } from "@noble/hashes/blake3";
import { sha256 } from "@noble/hashes/sha256";
import { utf8ToBytes } from "@noble/hashes/utils";
import { bytesToHex } from "./encode";

export type CanonMode = "utf8_exact" | "json_sorted_compact" | "bytes_b64";
export type HashAlgo = "blake3" | "sha256";

export interface PackOptions {
  canon: CanonMode;
  algo?: HashAlgo; // default: blake3
  tag?: string;
}

export interface ZPKParsed {
  canon: CanonMode;
  algo: HashAlgo;
  tag?: string;
  digest: string; // lowercase hex
}

// -------------------------
// Internal helpers
// -------------------------

function assertNoWhitespace(s: string): void {
  if (/\s/.test(s)) throw new Error("ZPK1 contains whitespace, which is not permitted.");
}

function assertTag(tag: string): void {
  if (tag.length === 0) throw new Error("ZPK1 tag must not be empty.");
  if (tag.includes("|") || tag.includes("=")) throw new Error("ZPK1 tag must not include '|' or '=' characters.");
}

function isLowerHex64(s: string): boolean {
  return /^[0-9a-f]{64}$/.test(s);
}

function sortJson(value: unknown): unknown {
  if (value === null) return null;
  if (typeof value !== "object") return value;
  if (Array.isArray(value)) return value.map(sortJson);

  const obj = value as Record<string, unknown>;
  const keys = Object.keys(obj).sort();
  const out: Record<string, unknown> = {};
  for (const k of keys) out[k] = sortJson(obj[k]);
  return out;
}

/**
 * Decode base64 or base64url to bytes (strict, no whitespace).
 */
function base64ToBytes(input: string): Uint8Array {
  assertNoWhitespace(input);

  // Normalize base64url to base64
  let s = input.replace(/-/g, "+").replace(/_/g, "/");
  // Pad to multiple of 4
  while (s.length % 4 !== 0) s += "=";

  // Node
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const g: any = globalThis as any;
  if (typeof g.Buffer !== "undefined") {
    return new Uint8Array(g.Buffer.from(s, "base64"));
  }

  // Browser / RN with atob
  if (typeof g.atob === "function") {
    const bin = g.atob(s);
    const out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  }

  // Manual decode (fallback)
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  const rev: Record<string, number> = {};
  for (let i = 0; i < chars.length; i++) rev[chars[i]] = i;

  const cleaned = s.replace(/=+$/g, "");
  const bytes: number[] = [];
  let buffer = 0;
  let bits = 0;

  for (let i = 0; i < cleaned.length; i++) {
    const c = cleaned[i];
    const v = rev[c];
    if (v === undefined) throw new Error("Invalid base64 character in bytes_b64 payload.");
    buffer = (buffer << 6) | v;
    bits += 6;
    if (bits >= 8) {
      bits -= 8;
      bytes.push((buffer >> bits) & 0xff);
    }
  }

  return new Uint8Array(bytes);
}

function canonicalizeToBytes(payload: unknown, canon: CanonMode): Uint8Array {
  if (canon === "utf8_exact") {
    if (typeof payload !== "string") throw new Error("utf8_exact canon requires a string payload.");
    return utf8ToBytes(payload);
  }

  if (canon === "json_sorted_compact") {
    // Accept any JSON-serializable input; enforce by JSON.stringify
    const sorted = sortJson(payload);
    const compact = JSON.stringify(sorted);
    if (typeof compact !== "string") throw new Error("Failed to stringify JSON payload.");
    return utf8ToBytes(compact);
  }

  // bytes_b64
  if (payload instanceof Uint8Array) return payload;
  if (typeof payload !== "string") throw new Error("bytes_b64 canon requires a base64/base64url string or Uint8Array payload.");
  return base64ToBytes(payload);
}

function hashBytes(bytes: Uint8Array, algo: HashAlgo): Uint8Array {
  return algo === "sha256" ? sha256(bytes) : blake3(bytes);
}

// -------------------------
// Public API
// -------------------------

/**
 * Pack a payload into a ZPK1 string.
 *
 * ZPK1 contains no raw data, only metadata and a digest.
 * Output is strict and deterministic.
 */
export function packZPK1(payload: unknown, opts: PackOptions): string {
  const canon = opts.canon;
  const algo: HashAlgo = opts.algo ?? "blake3";

  if (algo !== "blake3" && algo !== "sha256") {
    throw new Error("Invalid algo. Expected 'blake3' or 'sha256'.");
  }

  const bytes = canonicalizeToBytes(payload, canon);
  const digestHex = bytesToHex(hashBytes(bytes, algo));

  if (!isLowerHex64(digestHex)) {
    throw new Error("Invalid digest produced. Expected 64 lowercase hex characters.");
  }

  if (opts.tag !== undefined) assertTag(opts.tag);

  const base = `ZPK1|canon=${canon}|algo=${algo}`;
  if (opts.tag) return `${base}|tag=${opts.tag}|digest=${digestHex}`;
  return `${base}|digest=${digestHex}`;
}

/**
 * Parse and validate a ZPK1 string.
 * Throws on any violation.
 */
export function unpackZPK1(packed: string): ZPKParsed {
  if (typeof packed !== "string") throw new Error("ZPK1 must be a string.");
  assertNoWhitespace(packed);

  const parts = packed.split("|");
  if (parts[0] !== "ZPK1") throw new Error("Invalid packed payload: expected prefix ZPK1.");

  // Either 4 parts (no tag) or 5 parts (with tag)
  if (parts.length !== 4 && parts.length !== 5) {
    throw new Error("Invalid packed payload: expected 4 or 5 pipe-delimited parts.");
  }

  const canonPart = parts[1];
  const algoPart = parts[2];

  const canon = canonPart.startsWith("canon=") ? canonPart.slice(6) : null;
  if (!canon) throw new Error("Invalid packed payload: missing canon field.");
  if (canon !== "utf8_exact" && canon !== "json_sorted_compact" && canon !== "bytes_b64") {
    throw new Error("Invalid packed payload: unsupported canon value.");
  }

  const algo = algoPart.startsWith("algo=") ? algoPart.slice(5) : null;
  if (!algo) throw new Error("Invalid packed payload: missing algo field.");
  if (algo !== "blake3" && algo !== "sha256") {
    throw new Error("Invalid packed payload: unsupported algo value.");
  }

  let tag: string | undefined;
  let digestPart: string;

  if (parts.length === 5) {
    const tagPart = parts[3];
    if (!tagPart.startsWith("tag=")) throw new Error("Invalid packed payload: expected tag field.");
    tag = tagPart.slice(4);
    assertTag(tag);

    digestPart = parts[4];
  } else {
    digestPart = parts[3];
  }

  if (!digestPart.startsWith("digest=")) throw new Error("Invalid packed payload: missing digest field.");
  const digest = digestPart.slice(7);

  if (!isLowerHex64(digest)) {
    throw new Error("Invalid packed payload: digest must be 64 lowercase hex characters.");
  }

  return { canon, algo, tag, digest } as ZPKParsed;
}

/**
 * Returns true if packed is valid ZPK1, otherwise false.
 */
export function isValidZPK1(packed: string): boolean {
  try {
    unpackZPK1(packed);
    return true;
  } catch {
    return false;
  }
}
