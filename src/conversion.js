const { generateZeusHash } = require('./timehash');

/**
 * Converts a UNIX timestamp (seconds) to a ZEUS hash.
 * @param {number} unixTime - UNIX timestamp in seconds.
 * @returns {Promise<string>} ZEUS hash equivalent.
 */
async function unixToZeus(unixTime) {
  return await generateZeusHash(unixTime);
}

/**
 * Converts a ZEUS time hash back to a readable ISO timestamp.
 * NOTE: One-way hashing means original timestamp cannot be reconstructed.
 * @param {string} zeusHash - ZEUS time hash.
 * @returns {number} - Placeholder (ZEUS timestamps are one-way hashes).
 */
function zeusToUnix(zeusHash) {
  throw new Error("ZEUS timestamps are irreversible due to cryptographic hashing. If validation is needed, compare against a previously generated ZEUS hash.");
}

module.exports = { unixToZeus, zeusToUnix };
