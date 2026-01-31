import type { ZeusOptions } from "./types";
import { zeusHash } from "./api";

// Legacy helpers for environments that do not want BLAKE3.
// These use SHA-256 and remain one-way.

export function legacyUnixToZeus(unix: number, format: ZeusOptions["format"] = "hex"): string {
  return zeusHash(unix, { algorithm: "sha256", format });
}

export function legacyZeusHash(input: string | number | Date, format: ZeusOptions["format"] = "hex"): string {
  return zeusHash(input, { algorithm: "sha256", format });
}
