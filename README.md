# ZEUS Time

Deterministic, cryptographically verifiable time hashing for Node, browsers, and Expo or React Native.

ZEUS turns a timestamp into a fixed hash. The same moment, normalized the same way, always produces the same hash. This is useful for tamper-evident logs, distributed coordination, and time keyed identifiers.

## Install

```sh
npm install zeus-time
# or
yarn add zeus-time
```

## Quick start

```ts
import { zeusHash, verifyZeusHash } from "zeus-time";

const iso = new Date().toISOString();
const h = zeusHash(iso);               // default: blake3, hex
const ok = verifyZeusHash(iso, h);     // true
```

## Input formats

`zeusHash()` accepts:

- `Date`
- ISO timestamp string
- `number` as unix seconds or unix milliseconds (auto-detected)

Normalization always returns an ISO 8601 string in UTC with milliseconds. That normalized string is the thing that gets hashed.

## Output formats

- Default output is lowercase hex (64 chars)
- Optional output is base64url (43 chars, no padding)

```ts
import { zeusHash } from "zeus-time";

const hHex = zeusHash("2025-01-01T00:00:00Z");
const hB64 = zeusHash("2025-01-01T00:00:00Z", { format: "base64url" });
```

## Algorithms

- Default algorithm is BLAKE3
- Legacy algorithm is SHA-256

```ts
import { zeusHash, legacyUnixToZeus } from "zeus-time";

const blake3Hash = zeusHash(1735689600);
const sha256Hash = legacyUnixToZeus(1735689600);
```

## About reverse conversion

ZEUS hashes are one-way. There is no cryptographic reverse from hash to timestamp.

If you need reverse mapping, that is a lookup problem. Store the original timestamp alongside the hash in your own database or ledger.

## Expo compatibility

This version avoids Node builtins and avoids WASM dependencies in the default path. It is designed to work in Expo and React Native without polyfills.

## Compatibility

v0.2 keeps the v0.1 public API available so existing consumers do not break.

Legacy exports restored:

- `validateZeusTimestamp(timestamp, expectedHash)`
- `executeAtZeusEpoch(epochTime, callback)`
- `legacyZeusToUnix(zeusHash)`

Notes:

- `unixToZeus(unix)` is async (returns a Promise) for v0.1 TypeScript compatibility.
- If you want a synchronous helper, use `unixToZeusSync(unix)`.
- `zeusToUnix(zeusHash)` exists for continuity but throws because ZEUS hashes are one-way.

## License

Apache 2.0
