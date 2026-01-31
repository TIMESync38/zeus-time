import { unixToZeus, legacyUnixToZeus, zeusHash, legacyZeusHash } from "../src";

describe("Legacy SHA-256 mode Tests (v0.2)", () => {
  test("Default is BLAKE3 and outputs 64 hex chars", () => {
    const unixTime = 1704067200;
    const hash = unixToZeus(unixTime);
    expect(typeof hash).toBe("string");
    expect(hash.length).toBe(64);
  });

  test("Legacy SHA-256 fallback outputs 64 hex chars", () => {
    const unixTime = 1704067200;
    const hash = legacyUnixToZeus(unixTime);
    expect(typeof hash).toBe("string");
    expect(hash.length).toBe(64);
  });

  test("Base64url output is shorter", () => {
    const unixTime = 1704067200;
    const h1 = zeusHash(unixTime, { format: "base64url" });
    const h2 = legacyZeusHash(unixTime, "base64url");
    expect(h1.length).toBe(43);
    expect(h2.length).toBe(43);
  });
});
