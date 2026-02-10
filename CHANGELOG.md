
# Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog, and this project adheres to Semantic Versioning.

---

## [0.2.2] - 2026-02-09

### Added
- Expo and React Native compatible build outputs.
- Explicit synchronous hashing API (`zeusHash`, `unixToZeusSync`) for hot paths.
- Safe validation helper `validateZeusTimestamp` that never throws.
- Legacy compatibility helpers for smoother migration from 0.1.x.

### Changed
- Clarified separation between time representation and hashing.
- `unixToZeus` remains async for backward compatibility but now delegates to synchronous core logic.
- `executeAtZeusEpoch` now uses synchronous hashing internally for determinism and stability.
- Improved export map for Node, ESM, CJS, and React Native consumers.

### Fixed
- Prevented validation helpers from throwing runtime errors on malformed input.
- Resolved async interval overlap risk in epoch execution.
- Corrected legacy unix conversion behavior to parse ISO timestamps only.

### Notes
- ZEUS hashes remain one-way by design and are not reversible.
- This release is opt-in and intended for early adopters and Expo environments.
- `latest` continues to point to the stable 0.1.x line.

---

## [0.1.4] - 2026-02-08

### Changed
- Documentation and metadata updates only.
- No code or behavioral changes.
- Published as a safe patch to preserve existing users.

---

## [0.1.3] - 2025-01-27

### Added
- Initial public release of ZEUS-Time.
- Deterministic time hashing and verification utilities.
- Legacy SHA-256 fallback helpers.
- Epoch-based execution helper.

---
