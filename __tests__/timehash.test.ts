import { generateZeusHash } from '../src/timehash';

describe('ZEUS Timehash Tests', () => {
  test('Generates a consistent hash for the same timestamp', async () => {
    const timestamp = '2025-01-01T00:00:00Z';
    const hash1 = await generateZeusHash(timestamp);
    const hash2 = await generateZeusHash(timestamp);
    expect(hash1).toBe(hash2);
  });

  test('Handles invalid timestamps gracefully', async () => {
    await expect(generateZeusHash('invalid-date')).rejects.toThrow();
  });
});
