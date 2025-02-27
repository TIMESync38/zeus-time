import { validateZeusTimestamp } from '../src/validation';
import { generateZeusHash } from '../src/timehash';

describe('ZEUS Validation Tests', () => {
  test('Validates correct timestamps successfully', async () => {
    const timestamp = '2025-01-01T00:00:00Z';
    const hash = await generateZeusHash(timestamp);
    const isValid = await validateZeusTimestamp(timestamp, hash);
    expect(isValid).toBe(true);
  });

  test('Fails on invalid hashes', async () => {
    const timestamp = '2025-01-01T00:00:00Z';
    const isValid = await validateZeusTimestamp(timestamp, 'invalidhash');
    expect(isValid).toBe(false);
  });
});
