import { isValidZeusHex, isValidZeusBase64Url, isValidUnixTimestampSeconds, zeusHash } from "../src";

describe("Validation helpers (v0.2)", () => {
  test("Validates unix seconds range", () => {
    expect(isValidUnixTimestampSeconds(1)).toBe(true);
    expect(isValidUnixTimestampSeconds(0)).toBe(true);
    expect(isValidUnixTimestampSeconds(-1)).toBe(false);
    expect(isValidUnixTimestampSeconds("1")).toBe(false);
  });

  test("Validates hex hashes", () => {
    const h = zeusHash("2025-01-01T00:00:00Z");
    expect(isValidZeusHex(h)).toBe(true);
    expect(isValidZeusHex(h.slice(0, 63))).toBe(false);
  });

  test("Validates base64url hashes", () => {
    const h = zeusHash("2025-01-01T00:00:00Z", { format: "base64url" });
    expect(isValidZeusBase64Url(h)).toBe(true);
    expect(isValidZeusBase64Url(h + "a")).toBe(false);
  });
});
