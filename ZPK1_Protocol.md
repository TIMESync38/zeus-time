# ZPK1 --- Packed Payload Protocol

**Status:** Stable\
**Version Prefix:** `ZPK1`\
**Introduced In:** zeus-time 0.3.0

------------------------------------------------------------------------

## 1. Purpose

ZPK1 defines a deterministic, portable, human-readable packaging format
for pre-hashed payloads intended for temporal attestation by ZEUS.

ZPK1 exists to:

-   Eliminate JSON formatting ambiguity\
-   Prevent whitespace and encoding drift\
-   Avoid raw payload transmission\
-   Ensure strict cross-language reproducibility\
-   Bind canonicalization and algorithm choice into the attested object

ZPK1 contains **no raw payload data**.\
It contains only metadata and a digest.

------------------------------------------------------------------------

## 2. Canonical String Format

ZPK1 is a UTF-8 encoded, pipe-delimited string with strict field
ordering.

### Without tag

    ZPK1|canon=<mode>|algo=<algorithm>|digest=<hex>

### With optional tag

    ZPK1|canon=<mode>|algo=<algorithm>|tag=<label>|digest=<hex>

------------------------------------------------------------------------

## 3. Structural Rules

The following rules are mandatory:

1.  The string MUST begin with the literal prefix `ZPK1`
2.  Fields MUST appear in exact order
3.  No additional fields are permitted
4.  No whitespace is permitted anywhere in the string
5.  The delimiter between fields is `|`
6.  The delimiter between key and value is `=`
7.  Field names are lowercase and case-sensitive
8.  The string MUST be valid UTF-8
9.  Empty fields are not allowed

ZPK1 is intentionally strict. No auto-correction is permitted.

------------------------------------------------------------------------

## 4. Required Fields

### canon

Specifies the canonicalization method applied before hashing.

Allowed values:

-   `utf8_exact`
-   `json_sorted_compact`
-   `bytes_b64`

Each canonicalization mode MUST be deterministic.

------------------------------------------------------------------------

### algo

Specifies the hashing algorithm used to generate the digest.

Allowed values:

-   `blake3`
-   `sha256`

The algorithm MUST be explicitly declared.\
There are no implicit defaults.

------------------------------------------------------------------------

### digest

Lowercase hexadecimal representation of the hash output.

Rules:

-   Must contain only `[0-9a-f]`
-   Uppercase hex is invalid
-   Must be exactly 64 characters long
-   For `blake3`, output is fixed at 32 bytes (64 hex chars)
-   Extendable output mode (XOF) is not permitted

------------------------------------------------------------------------

## 5. Optional Field

### tag

Optional short descriptor.

Rules:

-   Must not contain `|`
-   Must not contain `=`
-   Must not be empty
-   UTF-8 encoded
-   Recommended maximum length: 64 characters
-   Must not contain sensitive data
-   Does not affect digest calculation

If present, `tag` MUST appear between `algo` and `digest`.

Correct ordering:

    ZPK1|canon=...|algo=...|tag=...|digest=...

If omitted, the field must be removed entirely.

------------------------------------------------------------------------

## 6. Determinism Requirements

Given identical input and canonicalization method:

-   The resulting digest MUST be byte-identical
-   The resulting ZPK1 string MUST be byte-identical
-   Tag MUST NOT influence digest
-   Repacking identical data MUST produce identical ZPK1 output

ZPK1 is deterministic by design.

------------------------------------------------------------------------

## 7. Validation Requirements

Any compliant validator MUST reject:

-   Incorrect prefix
-   Incorrect field order
-   Missing required fields
-   Extra fields
-   Unsupported `canon` values
-   Unsupported `algo` values
-   Uppercase hexadecimal
-   Incorrect digest length
-   Whitespace anywhere
-   Empty or malformed tag
-   Malformed key/value structure

Validation must be strict. Silent normalization is not allowed.

------------------------------------------------------------------------

## 8. Attestation Behavior (ZEUS Verify)

When a ZPK1 string is submitted to ZEUS Verify:

-   The entire string MUST be stamped exactly as received
-   Receipt binding is to the full packed string, not just the digest
-   Verification requires exact string match

ZPK1 enables privacy-preserving timestamping without transmitting raw
payload data.

------------------------------------------------------------------------

## 9. Versioning Policy

-   `ZPK1` is the protocol version marker
-   Structural breaking changes require a new prefix, e.g. `ZPK2`
-   Backward compatibility between major ZPK versions is not guaranteed
-   ZPK1 behavior is fixed once published

------------------------------------------------------------------------

## 10. Design Principles

ZPK1 is:

-   Minimal\
-   Deterministic\
-   Strict\
-   Human-readable\
-   Machine-parseable\
-   Privacy-preserving\
-   Non-extensible within a version

ZPK1 intentionally avoids hidden defaults and ambiguous parsing.

------------------------------------------------------------------------

## Example

    ZPK1|canon=json_sorted_compact|algo=blake3|tag=invoice:v1|digest=91ab4e8f4c2b7f...
