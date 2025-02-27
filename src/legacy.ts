import { createHash } from "crypto";
import { generateZeusHash, unixToZeus } from "./utils"; 
import { zeusToUnix } from "./conversion";


export function legacyUnixToZeus(unixTime: number): string {
    return unixToZeus(unixTime);
}

export function legacyZeusToUnix(zeusTime: string): number {
    return zeusToUnix(zeusTime);
}

/**
 * Converts a UNIX timestamp to ZEUS time format.
 * Ensures backward compatibility.
 */

export async function convertUnixToZeus(unixTime: number, useLegacy: boolean = false): Promise<string> {
  const isoTimestamp = unixToZeus(unixTime);

  if (useLegacy) {
    return createHash("sha256").update(isoTimestamp).digest("hex"); // 🔴 SHA-256 for old systems
  } else {
    return await generateZeusHash(isoTimestamp); // ✅ Blake3 for modern systems
  }
}

/**
 * Converts a ZEUS timestamp back to UNIX epoch time (if possible).
 */
export function convertZeusToUnix(zeusHash: string): number | null {
  // Since ZEUS is a cryptographic hash, direct reverse conversion is infeasible
  console.warn("ZEUS hashes are deterministic but not directly reversible.");
  return null; // Prevents fake time injection
}

/**
 * Hashes a given timestamp to ensure a deterministic, tamper-proof value.
 */
function hashTimestamp(timestamp: string): string {
  return createHash("sha256").update(timestamp).digest("hex");
}
