import { blake3 } from 'hash-wasm';
import { normalizeTimestamp } from './utils';

/**
 * Generates a ZEUS time hash using BLAKE3.
 * @param timestamp A valid ISO timestamp or UNIX time.
 * @returns A deterministic hash for the given timestamp.
 */
export async function generateZeusHash(timestamp: string | number): Promise<string> {
  try {
    const input = normalizeTimestamp(timestamp); // ✅ Ensures a valid time
    return await blake3(input);
  } catch (error) {
    console.error("ZEUS Hashing Error:", error);
    throw new Error("Invalid timestamp: Ensure the input is a valid UNIX timestamp (seconds since epoch).");
  }
}
