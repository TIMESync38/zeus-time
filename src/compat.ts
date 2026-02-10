import { verifyZeusHash, unixToZeusSync, zeusToUnix } from "./api";
import { isValidZeusBase64Url, isValidZeusHex } from "./validation";

// Compatibility surface for v0.1.x consumers.

/**
 * v0.1 export: validateZeusTimestamp(timestamp, expectedHash)
 * Returns true if the computed hash for the timestamp matches expectedHash.
 */
export async function validateZeusTimestamp(timestamp: string, expectedHash: string): Promise<boolean> {
  const okFormat = isValidZeusHex(expectedHash) || isValidZeusBase64Url(expectedHash);
  if (!okFormat) return false;

  try {
    return verifyZeusHash(timestamp, expectedHash);
  } catch {
    return false;
  }
}

/**
 * v0.1 export: executeAtZeusEpoch(epochTime, callback)
 * Polls once per second and triggers callback when current unix seconds hash equals epoch hash.
 */
export async function executeAtZeusEpoch(epochTime: number, callback: () => void): Promise<void> {
  const targetHash = unixToZeusSync(epochTime);

  const interval = setInterval(() => {
    const now = Math.floor(Date.now() / 1000);
    const currentHash = unixToZeusSync(now);

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
function looksLikeIso(input: string): boolean {
  // Loose but practical ISO check
  return /^\d{4}-\d{2}-\d{2}T/.test(input);
}

export function legacyZeusToUnix(zeusTime: string): number {
  if (looksLikeIso(zeusTime)) {
    const ms = Date.parse(zeusTime);
    if (!Number.isFinite(ms)) {
      throw new Error("Invalid ISO timestamp. Cannot convert to unix seconds.");
    }
    return Math.floor(ms / 1000);
  }

  // Hashes remain one way, do not pretend otherwise
  throw new Error(
    "Input appears to be a ZEUS hash. ZEUS hashes are one-way. Use the original timestamp or a lookup store for reverse mapping."
  );
}
