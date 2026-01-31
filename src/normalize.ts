// Normalization rules for hashing.
// Output is always an ISO 8601 string in UTC with milliseconds.

export function normalizeTime(input: string | number | Date): string {
  if (input instanceof Date) return input.toISOString();

  if (typeof input === "number") {
    // Heuristic: treat small numbers as seconds, large numbers as ms.
    const ms = input < 1e12 ? input * 1000 : input;
    const d = new Date(ms);
    if (isNaN(d.getTime())) throw new Error("Invalid UNIX timestamp number.");
    return d.toISOString();
  }

  if (typeof input === "string") {
    // Determinism rule: only accept ISO 8601 strings that include an explicit timezone (Z or +/-HH:MM).
    // Avoid locale-dependent parsing like "01/02/2025 10:00" which can differ across runtimes.
    const ISO_WITH_TZ =
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?(?:Z|[+-]\d{2}:\d{2})$/;

    if (!ISO_WITH_TZ.test(input)) {
      throw new Error(
        "Invalid timestamp string. Expected ISO 8601 with timezone, for example 2025-01-01T00:00:00Z."
      );
    }

    const d = new Date(input);
    if (isNaN(d.getTime())) {
      throw new Error("Invalid timestamp string. Could not parse ISO 8601 value.");
    }
    return d.toISOString();
  }

  throw new Error("Invalid timestamp input.");
}
