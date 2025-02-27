const { generateZeusHash } = require('./timehash');
const { isValidZeusHash } = require('./utils'); // ✅ Validate format

/**
 * Validates whether a given timestamp matches a known ZEUS hash.
 * @param {string} timestamp - The timestamp to verify.
 * @param {string} expectedHash - The expected ZEUS hash.
 * @returns {Promise<boolean>} Boolean indicating if the hash matches.
 */
async function validateZeusTimestamp(timestamp, expectedHash) {
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

module.exports = { validateZeusTimestamp };
