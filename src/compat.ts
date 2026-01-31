import { verifyZeusHash, unixToZeus, zeusToUnix } from "./api";
import { isValidZeusBase64Url, isValidZeusHex } from "./validation";

// Compatibility surface for v0.1.x consumers.

/**
 * v0.1 export: validateZeusTimestamp(timestamp, expectedHash)
 * Returns true if the computed hash for the timestamp matches expectedHash.
 */
export async function validateZeusTimestamp(timestamp: string, expectedHash: string): Promise<boolean> {
  const okFormat = isValidZeusHex(expectedHash) || isValidZeusBase64Url(expectedHash);
  if (!okFormat) return false;
  return verifyZeusHash(timestamp, expectedHash);
}

/**
 * v0.1 export: executeAtZeusEpoch(epochTime, callback)
 * Polls once per second and triggers callback when current unix seconds hash equals epoch hash.
 */
export async function executeAtZeusEpoch(epochTime: number, callback: () => void): Promise<void> {
  const targetHash = await unixToZeus(epochTime);
  const interval = setInterval(async () => {
    const now = Math.floor(Date.now() / 1000);
    const currentHash = await unixToZeus(now);
    if (currentHash === targetHash) {
      clearInterval(interval);
      callback();
    }
  }, 1000);
}

/**
 * v0.1 export: legacyZeusToUnix(zeusTime)
 * ZEUS hashes are one-way. This function throws and exists for API continuity.
 */
export function legacyZeusToUnix(zeusTime: string): number {
  // Preserve the v0.1 call shape. This will throw.
  return zeusToUnix(zeusTime) as unknown as number;
}
