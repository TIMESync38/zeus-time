export function isValidUnixTimestampSeconds(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value >= 0 && value < 1e11;
}

export function isValidZeusHex(hash: unknown): hash is string {
  return typeof hash === "string" && /^[a-f0-9]{64}$/.test(hash);
}

export function isValidZeusBase64Url(hash: unknown): hash is string {
  return typeof hash === "string" && /^[A-Za-z0-9_-]{43}$/.test(hash);
}
