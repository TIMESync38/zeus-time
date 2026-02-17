import { packZPK1, unpackZPK1, isValidZPK1 } from "../src/zpk";

describe("ZPK1", () => {
  test("packs and unpacks json_sorted_compact deterministically", () => {
    const a = { b: 1, a: 2, nested: { z: true, y: false } };
    const b = { nested: { y: false, z: true }, a: 2, b: 1 };

    const p1 = packZPK1(a, { canon: "json_sorted_compact" });
    const p2 = packZPK1(b, { canon: "json_sorted_compact" });

    expect(p1).toBe(p2);
    expect(isValidZPK1(p1)).toBe(true);

    const parsed = unpackZPK1(p1);
    expect(parsed.canon).toBe("json_sorted_compact");
    expect(parsed.algo).toBe("blake3");
    expect(parsed.digest).toMatch(/^[0-9a-f]{64}$/);
  });

  test("rejects invalid order and uppercase hex", () => {
    const badOrder = "ZPK1|algo=blake3|canon=utf8_exact|digest=" + "a".repeat(64);
    expect(isValidZPK1(badOrder)).toBe(false);

    const upperHex = "ZPK1|canon=utf8_exact|algo=sha256|digest=" + "A".repeat(64);
    expect(isValidZPK1(upperHex)).toBe(false);
  });

  test("includes tag when provided", () => {
    const packed = packZPK1("hello", { canon: "utf8_exact", tag: "greeting" });
    expect(packed.includes("|tag=greeting|")).toBe(true);
    const parsed = unpackZPK1(packed);
    expect(parsed.tag).toBe("greeting");
  });
});
