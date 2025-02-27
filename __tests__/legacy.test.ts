import { convertUnixToZeus } from '../src/legacy';

describe('Legacy UNIX to ZEUS Conversion Tests', () => {
  test('Converts UNIX timestamp to ZEUS format correctly', async () => {
    const unixTime = 1704067200; // Jan 1, 2024
    const zeusHash = await convertUnixToZeus(unixTime);
    expect(typeof zeusHash).toBe('string');
    expect(zeusHash.length).toBe(64); // Blake3 hash length
  });

  test('Handles legacy SHA-256 fallback correctly', async () => {
    const unixTime = 1704067200;
    const zeusHash = await convertUnixToZeus(unixTime, true);
    expect(typeof zeusHash).toBe('string');
    expect(zeusHash.length).toBe(64); // SHA-256 hash length
  });
});
