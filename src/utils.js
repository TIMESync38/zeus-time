const blake3 = require('hash-wasm').blake3;

async function generateZeusHash(timestamp) {
    return await blake3(timestamp);
}

function unixToZeus(unixTime) {
    return new Date(unixTime * 1000).toISOString();
}

function zeusToUnix(zeusTime) {
    return Math.floor(Date.parse(zeusTime) / 1000);
}
/**
 * Ensures a timestamp is in ISO format for hashing.
 * Accepts Date objects, ISO strings, or UNIX timestamps.
 * @param {string | number | Date} input - Any time format.
 * @returns {string} ISO timestamp.
 */
function normalizeTimestamp(input) {
  if (input instanceof Date) {
    return input.toISOString();
  } else if (typeof input === "number") {
    return new Date(input * 1000).toISOString();
  } else if (typeof input === "string") {
    const date = new Date(input);
    if (!isNaN(date.getTime())) {
      return date.toISOString();
    }
  }
  throw new Error("Invalid timestamp format: Expected ISO 8601 string or UNIX timestamp.");
}
/**
 * Ensures a given input is a valid UNIX timestamp.
 * @param {number} timestamp - UNIX timestamp in seconds.
 * @returns {boolean} True if valid, otherwise false.
 */
function isValidUnixTimestamp(timestamp) {
  return typeof timestamp === "number" && timestamp > 0;
}

/**
 * Checks if a string is a valid BLAKE3 hash (64-char hex).
 * @param {string} hash - Hash to validate.
 * @returns {boolean} True if valid, otherwise false.
 */
function isValidZeusHash(hash) {
  return typeof hash === "string" && /^[a-f0-9]{64}$/.test(hash);
}
/**
 * Logs messages in a formatted manner.
 * @param {string} message - The message to log.
 * @param {string} level - Log level: "info", "warn", "error".
 */
function log(message, level = "info") {
  const prefix = {
    info: "[INFO] ⚡",
    warn: "[WARN] ⚠️",
    error: "[ERROR] ❌",
  }[level] || "[LOG] 📝";
  console.log(`${prefix} ${message}`);
}
/**
 * Converts a UNIX timestamp to a human-readable string.
 * @param {number} unixTime - UNIX timestamp in seconds.
 * @returns {string} Formatted date string.
 */
function unixToHuman(unixTime) {
  if (!isValidUnixTimestamp(unixTime)) throw new Error("Invalid UNIX timestamp: Must be a positive integer representing seconds since epoch.");
  return new Date(unixTime * 1000).toUTCString();
}
/**
 * Syncs local system time with an external NTP server.
 * @returns {Promise<Date>} Synchronized time.
 */
async function syncWithNTP() {
  try {
    const response = await fetch("https://worldtimeapi.org/api/ip");
    const data = await response.json();
    return new Date(data.utc_datetime);
  } catch (error) {
    throw new Error("NTP sync failed: Check internet connection or NTP server status.");
  }
}

module.exports = { generateZeusHash, unixToZeus, zeusToUnix, unixToHuman, isValidZeusHash, isValidUnixTimestamp, log, normalizeTimestamp};

