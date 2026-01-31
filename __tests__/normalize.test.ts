import { normalizeTime } from "../src";

describe("normalizeTime (v0.2)", () => {
  test("Normalizes ISO inputs to UTC ISO with milliseconds", () => {
    expect(normalizeTime("2025-01-01T00:00:00Z")).toBe("2025-01-01T00:00:00.000Z");
    expect(normalizeTime("2025-01-01T05:00:00+05:00")).toBe("2025-01-01T00:00:00.000Z");
  });

  test("Rejects non-ISO, locale-dependent timestamp strings", () => {
    expect(() => normalizeTime("01/02/2025 10:00")).toThrow();
    expect(() => normalizeTime("2025-01-01 10:00:00")).toThrow();
    expect(() => normalizeTime("2025-01-01T00:00:00")).toThrow();
  });
});
