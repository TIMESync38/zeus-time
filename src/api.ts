import type { ZeusOptions } from "./types";
import { normalizeTime } from "./normalize";
import { hashTimeNormalized } from "./hash";
import { constantTimeEqual } from "./encode";

export function zeusHash(input: string | number | Date, options: ZeusOptions = {}): string {
  const algorithm = options.algorithm ?? "blake3";
  const format = options.format ?? "hex";
  const iso = normalizeTime(input);
  return hashTimeNormalized(iso, algorithm, format);
}

// Backward compatible name (v0.1 used async hashing)
export async function generateZeusHash(input: string | number | Date, options: ZeusOptions = {}): Promise<string> {
  return zeusHash(input, options);
}

export function verifyZeusHash(
  input: string | number | Date,
  expectedHash: string,
  options: ZeusOptions = {}
): boolean {
  const actual = zeusHash(input, options);
  return constantTimeEqual(actual, expectedHash);
}

// Convenience wrappers for unix seconds and unix ms.
export function unixToZeusSync(unix: number, options: ZeusOptions = {}): string {
  return zeusHash(unix, options);
}

// Backward compatible signature for v0.1 consumers.
// Awaiting a string is fine at runtime, but this preserves the Promise return type
// for TypeScript projects that were written against v0.1.
export async function unixToZeus(unix: number, options: ZeusOptions = {}): Promise<string> {
  return unixToZeusSync(unix, options);
}

// There is no cryptographic reverse. This function name remains for clarity.
// If you need reverse mapping, that is a lookup problem and requires storing mappings.
export function zeusToUnix(_zeusHash?: string): never {
  throw new Error("ZEUS hashes are one-way. Use the original timestamp or implement a lookup store if you need reverse mapping.");
}
