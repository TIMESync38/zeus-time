import { generateZeusHash } from './timehash';

/**
 * Converts a UNIX timestamp (seconds) to a ZEUS hash.
 * @param unixTime UNIX timestamp in seconds.
 * @returns ZEUS hash equivalent.
 */
export async function unixToZeus(unixTime: number): Promise<string> {
  return await generateZeusHash(unixTime);
}

/**
 * Converts a ZEUS time hash back to a readable ISO timestamp.
 * NOTE: One-way hashing means original timestamp cannot be reconstructed.
 * @param zeusHash ZEUS time hash.
 * @returns An estimated corresponding UNIX timestamp.
 */
export function zeusToUnix(zeusHash: string): number {
  throw new Error("ZEUS timestamps are irreversible due to cryptographic hashing. If validation is needed, compare against a previously generated ZEUS hash.");
}
