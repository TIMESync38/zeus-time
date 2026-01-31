// Encoding helpers that work in Node, browsers, and React Native (including Expo).

export function bytesToHex(bytes: Uint8Array): string {
  let out = "";
  for (let i = 0; i < bytes.length; i++) {
    out += bytes[i].toString(16).padStart(2, "0");
  }
  return out;
}

function bytesToBase64(bytes: Uint8Array): string {
  // Node
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const g: any = globalThis as any;
  if (typeof g.Buffer !== "undefined") {
    return g.Buffer.from(bytes).toString("base64");
  }

  // Browser / RN with atob/btoa
  if (typeof g.btoa === "function") {
    let bin = "";
    for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
    return g.btoa(bin);
  }

  // Fallback: manual base64
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  let result = "";
  let i = 0;
  for (; i + 2 < bytes.length; i += 3) {
    const n = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
    result += chars[(n >> 18) & 63] + chars[(n >> 12) & 63] + chars[(n >> 6) & 63] + chars[n & 63];
  }
  if (i < bytes.length) {
    const a = bytes[i];
    const b = i + 1 < bytes.length ? bytes[i + 1] : 0;
    const n = (a << 16) | (b << 8);
    result += chars[(n >> 18) & 63] + chars[(n >> 12) & 63];
    result += i + 1 < bytes.length ? chars[(n >> 6) & 63] : "=";
    result += "=";
  }
  return result;
}

export function bytesToBase64Url(bytes: Uint8Array): string {
  return bytesToBase64(bytes).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

export function constantTimeEqual(a: string, b: string): boolean {
  // Constant time compare for strings without Node crypto dependency.
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
