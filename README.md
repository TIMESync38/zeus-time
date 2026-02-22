# ZEUS-Time

**Deterministic. Verifiable. Calm.**

ZEUS-Time is a verifiable time primitive for distributed systems. It
does not replace clocks. It does not guess truth. It produces
deterministic, cryptographically verifiable receipts of time.

Unix time is treated as input material, not authority.

------------------------------------------------------------------------

## ZEUS 0.3.x

ZEUS 0.3 introduces the formalized **ZPK1 (ZEUS Proof Kernel v1)** canonical proof format.

ZPK1 defines the structural encoding used to produce deterministic temporal receipts, including:

- Canonicalization rule
- Hash algorithm label
- Timestamp tag
- Payload digest

ZEUS remains:

- Deterministic
- Substrate-independent
- Cryptographically verifiable
- Free of hidden entropy or mutation

---

## ZEUS Verify API (Hosted)

ZEUS Verify is a hosted stamping service built on the deterministic ZEUS core.

It allows:

- Receipt issuance via API
- Persistent receipt storage
- Public verification without authentication
- Subscription-based access tiers (rate-limited)

Core guarantees remain identical between local ZEUS Core and ZEUS Verify.

The API provides operational convenience — not altered cryptographic behavior.

Documentation: https://verify.e2ee.ca/docs

------------------------------------------------------------------------

## What ZEUS Is (and Is Not)

ZEUS provides verifiable ordering and integrity of time-based events.

-   It proves when something happened relative to other events
-   It does not claim civil time accuracy
-   It does not reverse hashes
-   It does not depend on blockchains or consensus

Think of ZEUS as a time receipt, not a clock.

------------------------------------------------------------------------

## Features

-   Deterministic time hashing using BLAKE3
-   Stable, reproducible outputs across platforms
-   Local-first, no network dependency
-   Expo and React Native compatible
-   Legacy helpers for smooth migration from 0.1.x
-   Optional base64url or hex encoding
-   Explicit separation between time representation and hashing

------------------------------------------------------------------------

## Installation

``` sh
npm install zeus-time
```

or

``` sh
yarn add zeus-time
```

------------------------------------------------------------------------

## Basic Usage

### Generate a ZEUS hash from a timestamp

``` ts
import { zeusHash } from "zeus-time";

const iso = new Date().toISOString();
const hash = zeusHash(iso);

console.log(hash);
```

This hash is deterministic. The same input always produces the same
output.

------------------------------------------------------------------------

### Stamp unix time deterministically (sync)

``` ts
import { unixToZeusSync } from "zeus-time";

const unixSeconds = Math.floor(Date.now() / 1000);
const hash = unixToZeusSync(unixSeconds);
```

This is the preferred hot path for applications.

------------------------------------------------------------------------

### Async compatibility helper (legacy friendly)

``` ts
import { unixToZeus } from "zeus-time";

const hash = await unixToZeus(1704067200);
```

This exists for continuity with earlier versions.

------------------------------------------------------------------------

## Verification

### Verify a timestamp against a hash

``` ts
import { verifyZeusHash } from "zeus-time";

const ok = verifyZeusHash(iso, hash);
```

Returns true if the hash matches the normalized timestamp.

------------------------------------------------------------------------

### Safe validation helper

``` ts
import { validateZeusTimestamp } from "zeus-time";

const isValid = await validateZeusTimestamp(iso, hash);
```

This helper never throws. It returns false on invalid input.

------------------------------------------------------------------------

## Epoch-Based Execution

``` ts
import { executeAtZeusEpoch } from "zeus-time";

executeAtZeusEpoch(1735689600, () => {
  console.log("ZEUS epoch reached");
});
```

------------------------------------------------------------------------

## Legacy Compatibility

ZEUS 0.2.x keeps compatibility helpers while preserving one-way
integrity.

### Legacy hashing helpers

``` ts
import { legacyUnixToZeus, legacyZeusHash } from "zeus-time";
```

### Legacy unix conversion

``` ts
import { legacyZeusToUnix } from "zeus-time";
```

-   If the input looks like an ISO timestamp, it is parsed
-   If the input looks like a hash, it throws
-   Hashes remain one-way by design

------------------------------------------------------------------------

## Performance

ZEUS is fast enough to be boring.

Example benchmarks on a standard desktop:

1,000 hashes \~12 ms 5,000 hashes \~51 ms 10,000 hashes \~98 ms 50,000
hashes \~430 ms

------------------------------------------------------------------------

## Use Cases

-   Audit receipts and compliance logs
-   Distributed systems needing ordering guarantees
-   Event integrity verification
-   Local-first applications
-   Smart contract preparation and off-chain proofs
-   Time-bound unlocks and delayed execution

ZEUS provides proof of time, not surveillance.

------------------------------------------------------------------------

## Versioning Strategy

-   0.1.x is the stable legacy line
-   0.2.x clarifies semantics and adds Expo compatibility
-   latest remains conservative
-   New behavior is opt-in

------------------------------------------------------------------------



## ZPK1 Packed Payloads

ZPK1 is a strict, deterministic packed payload format for external stamping workflows. It contains metadata plus a digest, not raw payload data.

Example:

```ts
import { packZPK1 } from "zeus-time";

const packed = packZPK1({ hello: "world" }, { canon: "json_sorted_compact" });
// ZPK1|canon=json_sorted_compact|algo=blake3|digest=<64 hex chars>
```

You can validate and parse packed strings:

```ts
import { isValidZPK1, unpackZPK1 } from "zeus-time";

if (isValidZPK1(packed)) {
  const parsed = unpackZPK1(packed);
  console.log(parsed.algo, parsed.canon, parsed.digest);
}
```

## License

Apache 2.0 Open, boring, and dependable.

------------------------------------------------------------------------

## A Small Amount of Fire

Unix time still works. But it was never designed to be verifiable.

ZEUS does not replace the clock. It replaces the argument.

BAM!