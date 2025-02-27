import { generateZeusHash } from '../src/timehash';

describe('ZEUS Timehash Enhanced Tests', () => {
  test('Generates a consistent hash for the same timestamp format variations', async () => {
    const dateObject = new Date('2025-01-01T00:00:00Z').toISOString(); // Convert to string
    const unixTimestamp = 1735689600; // Equivalent UNIX time
    const isoString = '2025-01-01T00:00:00Z';

    const hash1 = await generateZeusHash(dateObject);
    const hash2 = await generateZeusHash(unixTimestamp);
    const hash3 = await generateZeusHash(isoString);

    expect(hash1).toBe(hash2);
    expect(hash2).toBe(hash3);
  });

  test('Handles extreme dates correctly', async () => {
    const unixEpoch = 0; // 1970-01-01T00:00:00Z
    const futureDate = '2999-12-31T23:59:59Z';

    const epochHash = await generateZeusHash(unixEpoch);
    const futureHash = await generateZeusHash(futureDate);

    expect(typeof epochHash).toBe('string');
    expect(typeof futureHash).toBe('string');
    expect(epochHash).not.toBe(futureHash);
  });

  test('Rejects invalid timestamps gracefully', async () => {
    await expect(generateZeusHash('invalid-date')).rejects.toThrow();
    await expect(generateZeusHash('')).rejects.toThrow(); // Empty string test
  });

  test('Performance test: hashing multiple timestamps', async () => {
    const timestamps = Array.from({ length: 1000 }, (_, i) => `2025-01-01T00:00:${String(i % 60).padStart(2, '0')}Z`);
    const startTime = Date.now();
    await Promise.all(timestamps.map(ts => generateZeusHash(ts)));
    const duration = Date.now() - startTime;
    console.log(`\n🚀 Zeus-Time Performance Benchmark: Hashed 1000 timestamps in ${duration}ms! ⚡`);
    expect(duration).toBeLessThan(5000); // Ensure test completes within 5 seconds
  });
});
