import { generateZeusHash } from './timehash';
import { isValidZeusHash } from './utils';

/**
 * Validates whether a given timestamp matches a known ZEUS hash.
 * @param timestamp The timestamp to verify.
 * @param expectedHash The expected ZEUS hash.
 * @returns Boolean indicating if the hash matches.
 */
export async function validateZeusTimestamp(timestamp: string, expectedHash: string): Promise<boolean> {
  try {
    if (!isValidZeusHash(expectedHash)) {
      console.error("Invalid ZEUS hash format.");
      return false;
    }
    const computedHash = await generateZeusHash(timestamp);
    return computedHash === expectedHash;
  } catch (error) {
    console.error("Validation Error:", error);
    return false;
  }
}
