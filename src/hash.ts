import { blake3 } from "@noble/hashes/blake3";
import { sha256 } from "@noble/hashes/sha256";
import { utf8ToBytes } from "@noble/hashes/utils";
import { bytesToBase64Url, bytesToHex } from "./encode";
import type { ZeusAlgorithm, ZeusFormat } from "./types";

export function hashTimeNormalized(
  normalizedIsoUtc: string,
  algorithm: ZeusAlgorithm,
  format: ZeusFormat
): string {
  const msg = utf8ToBytes(normalizedIsoUtc);

  const digest =
    algorithm === "sha256"
      ? sha256(msg) // 32 bytes
      : blake3(msg); // 32 bytes by default

  if (format === "base64url") return bytesToBase64Url(digest);
  return bytesToHex(digest);
}
