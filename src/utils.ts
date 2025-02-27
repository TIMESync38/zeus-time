import * as hashWasm from 'hash-wasm';
const { blake3 } = hashWasm;

export async function generateZeusHash(timestamp: string): Promise<string> {
    return await blake3(timestamp);
}

export function unixToZeus(unixTime: number): string {
    return new Date(unixTime * 1000).toISOString();
}

export function zeusToUnix(zeusTime: string): number {
    return Math.floor(Date.parse(zeusTime) / 1000);
}
/**
 * Ensures a timestamp is in ISO format for hashing.
 * Accepts Date objects, ISO strings, or UNIX timestamps.
 * @param input - Any time format.
 * @returns ISO timestamp string.
 */
export function normalizeTimestamp(input: string | number | Date): string {
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
 * @param timestamp - UNIX timestamp in seconds.
 * @returns True if valid, otherwise false.
 */
export function isValidUnixTimestamp(timestamp: number): boolean {
  return typeof timestamp === "number" && timestamp > 0;
}

/**
 * Checks if a string is a valid BLAKE3 hash (64-char hex).
 * @param hash - Hash to validate.
 * @returns True if valid, otherwise false.
 */
export function isValidZeusHash(hash: string): boolean {
  return /^[a-f0-9]{64}$/.test(hash);
}
/**
 * Logs messages in a formatted manner.
 * @param message - The message to log.
 * @param level - Log level: "info", "warn", "error".
 */
export function log(message: string, level: "info" | "warn" | "error" = "info"): void {
  const prefix = {
    info: "[INFO] ⚡",
    warn: "[WARN] ⚠️",
    error: "[ERROR] ❌",
  }[level] || "[LOG] 📝";
  console.log(`${prefix} ${message}`);
}
/**
 * Converts a UNIX timestamp to a human-readable string.
 * @param unixTime - UNIX timestamp in seconds.
 * @returns Formatted date string.
 */
export function unixToHuman(unixTime: number): string {
  if (!isValidUnixTimestamp(unixTime)) throw new Error("Invalid UNIX timestamp: Must be a positive integer representing seconds since epoch.");
  return new Date(unixTime * 1000).toUTCString();
}
/**
 * Syncs local system time with an external NTP server.
 * @returns Promise<Date> - Synchronized time.
 */
export async function syncWithNTP(): Promise<Date> {
  try {
    const response = await fetch("https://worldtimeapi.org/api/ip");
    const data = await response.json();
    return new Date(data.utc_datetime);
  } catch (error) {
    throw new Error("NTP sync failed: Check internet connection or NTP server status.");
  }
}
