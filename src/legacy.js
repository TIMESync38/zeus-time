const crypto = require("crypto");
const { unixToZeus, zeusToUnix, generateZeusHash } = require('./utils');


function legacyUnixToZeus(unixTime) {
    return unixToZeus(unixTime);
}

function legacyZeusToUnix(zeusTime) {
    return zeusToUnix(zeusTime);
}

/**
 * Converts a UNIX timestamp to ZEUS time format.
 * Uses SHA-256 for legacy compatibility if Blake3 is unavailable.
 */
async function convertUnixToZeus(unixTime, useLegacy = false) {
  const isoTimestamp = unixToZeus(unixTime);

  if (useLegacy) {
    return crypto.createHash("sha256").update(isoTimestamp).digest("hex"); // 🔴 SHA-256 for old systems
  } else {
    return await generateZeusHash(isoTimestamp); // ✅ Blake3 for modern systems
  }
}

/**
 * Converts a ZEUS timestamp back to UNIX time.
 */
function convertZeusToUnix(zeusHash) {
  console.warn("ZEUS hashes are deterministic but not directly reversible.");
  return null;
}

/**
 * Hashes the timestamp to create a deterministic value.
 */
function hashTimestamp(timestamp) {
  return crypto.createHash("sha256").update(timestamp).digest("hex");
}

module.exports = { convertUnixToZeus, convertZeusToUnix, legacyUnixToZeus, legacyZeusToUnix };
