const { blake3 } = require('hash-wasm');
const { normalizeTimestamp } = require('./utils'); 

/**
 * Generates a ZEUS time hash using BLAKE3.
 * @param {string | number} timestamp - A valid ISO timestamp or UNIX time.
 * @returns {Promise<string>} A deterministic hash for the given timestamp.
 */
async function generateZeusHash(timestamp) {
  try {
    const input = normalizeTimestamp(timestamp); // ✅ Ensures a valid time
    return await blake3(input);
  } catch (error) {
    console.error("ZEUS Hashing Error:", error);
    throw new Error("Invalid timestamp: Ensure the input is a valid UNIX timestamp (seconds since epoch).");
  }
}

module.exports = { generateZeusHash };
