import {
  unixToZeus,
  legacyUnixToZeus,
  zeusHash,
  legacyZeusHash,
} from "../src";

describe("Legacy hashing compatibility (v0.2.x)", () => {
  test("Default hashing (BLAKE3) outputs 64 hex chars", async () => {
    const unixTime = 1704067200;

    // unixToZeus may be async in 0.2.x
    const hash = await unixToZeus(unixTime);

    expect(typeof hash).toBe("string");
    expect(hash.length).toBe(64);
  });

  test("Legacy hashing fallback outputs 64 hex chars", () => {
    const unixTime = 1704067200;

    const hash = legacyUnixToZeus(unixTime);

    expect(typeof hash).toBe("string");
    expect(hash.length).toBe(64);
  });

  test("Base64url output is shorter for both modern and legacy hashing", () => {
    const unixTime = 1704067200;

    const modern = zeusHash(unixTime, { format: "base64url" });
    const legacy = legacyZeusHash(unixTime, "base64url");

    expect(modern.length).toBe(43);
    expect(legacy.length).toBe(43);
  });
});
