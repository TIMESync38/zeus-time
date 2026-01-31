import { generateZeusHash } from "../src";

describe("ZEUS Timehash Enhanced Tests (v0.2)", () => {
  test("Generates a consistent hash for equivalent time representations", async () => {
    const isoString = "2025-01-01T00:00:00Z";
    const dateIso = new Date(isoString).toISOString();
    const unixSeconds = 1735689600;
    const unixMs = unixSeconds * 1000;

    const h1 = await generateZeusHash(dateIso);
    const h2 = await generateZeusHash(unixSeconds);
    const h3 = await generateZeusHash(isoString);
    const h4 = await generateZeusHash(unixMs);

    expect(h1).toBe(h2);
    expect(h2).toBe(h3);
    expect(h3).toBe(h4);
  });

  test("Handles extreme dates correctly", async () => {
    const unixEpochSeconds = 0;
    const futureDate = "2999-12-31T23:59:59Z";

    const epochHash = await generateZeusHash(unixEpochSeconds);
    const futureHash = await generateZeusHash(futureDate);

    expect(typeof epochHash).toBe("string");
    expect(typeof futureHash).toBe("string");
    expect(epochHash).not.toBe(futureHash);
  });

  test("Rejects invalid timestamps gracefully", async () => {
    await expect(generateZeusHash("invalid-date")).rejects.toThrow();
    await expect(generateZeusHash("")).rejects.toThrow();
  });

  test("Performance: hashing 1000 timestamps", async () => {
    const timestamps = Array.from({ length: 1000 }, (_, i) => `2025-01-01T00:00:${String(i % 60).padStart(2, "0")}Z`);
    const start = Date.now();
    await Promise.all(timestamps.map((ts) => generateZeusHash(ts)));
    const duration = Date.now() - start;
    // Loose ceiling to avoid flaky CI and slower machines
    expect(duration).toBeLessThan(7000);
  });
});
