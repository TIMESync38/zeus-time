# ZEUS: The Future of Timekeeping 🚀

**UNIX is dead. ZEUS lives.** This package introduces a deterministic, cryptographically verifiable time system designed to replace traditional UNIX timestamps. With ZEUS, developers can generate and validate time hashes, ensuring synchronization across systems without relying on sequential UNIX time.

---

## 🌟 Features

👉 **Deterministic Timestamps** – Generate a unique, cryptographic hash from any timestamp.  
👉 **Epoch-Based Execution** – Set an epoch based on a ZEUS hash for synchronized execution.  
👉 **Decentralized & Immutable** – No single point of failure; timestamp verification is trustless.  
👉 **Backward-Compatible with UNIX** – Convert traditional UNIX time into ZEUS easily.  
👉 **Supports Legacy Systems** – SHA-256 fallback for older systems that can't run Blake3.  
👉 **Ideal for Web3, Smart Contracts, IoT, and Security Applications**  

---

## 🛢️ Installation

```sh
# Using Yarn
yarn add zeus-time

# Using NPM
npm install zeus-time
```

---

## ❤️ Usage

### 🔹 Generate a ZEUS Timestamp
```typescript
import { generateZeusHash } from "zeus-time";

async function generateTimeHash() {
  const timestamp = new Date().toISOString();
  const hash = await generateZeusHash(timestamp);
  console.log(`ZEUS Time Hash: ${hash}`);
}

generateTimeHash();
```

### 🔹 Convert UNIX Time to ZEUS Time
```typescript
import { unixToZeus } from "zeus-time";

const unixTime = Math.floor(Date.now() / 1000);
unixToZeus(unixTime).then(hash => {
  console.log(`Converted ZEUS Epoch: ${hash}`);
});
```

### 🔹 Convert ZEUS Back to UNIX Time
```typescript
import { zeusToUnix } from "zeus-time";

const zeusHash = "your_zeus_hash_here";
const unixTime = zeusToUnix(zeusHash);
console.log(`Converted UNIX Time: ${unixTime}`);
```
```
💡 **Note:** `zeusToUnix()` is the primary function for ZEUS time handling. For legacy support, use `legacyZeusToUnix()`.
```

### 🔹 Execute Based on a ZEUS Epoch
```typescript
import { executeAtZeusEpoch } from "zeus-time";

executeAtZeusEpoch(1735689600, () => {
  console.log("Executing synchronized action at ZEUS Epoch!");
});
```

---

## 🚀 Benchmark Performance
Zeus-Time is **blazing fast!** Recent tests show it can **hash timestamps at record-breaking speeds!** 💥

```bash
Performance Test: Hashed 1000 timestamps in **12ms** ⚡  
Performance Test: Hashed 5000 timestamps in **51ms** ⚡  
Performance Test: Hashed 10,000 timestamps in **98ms** ⚡  
Performance Test: Hashed 50,000 timestamps in **434ms** ⚡  
```

### **Why Use Zeus-Time?**
👉 **Ultra-Fast** - Outperforms traditional UNIX-based hashing.  
👉 **Cryptographically Secure** - Uses BLAKE3 hashing for reliability.  
👉 **Future-Proof** - Designed for next-gen blockchain & AI applications.  

---

## 🎯 Use Cases

👉 **Smart Contracts** – Ensure execution only happens at a predetermined time.  
👉 **Decentralized Networks** – Nodes validate time-sensitive actions without a global clock.  
👉 **Gaming & AI** – Sync in-game events or AI processes based on immutable time hashes.  
👉 **Supply Chain & IoT** – Devices validate time-based triggers securely.  
👉 **File Integrity & Authentication** – Timestamped events are cryptographically secured.  

---

## 🔄 Legacy System Support

ZEUS is designed for modern timekeeping but also supports **legacy systems** with SHA-256 hashing. If Blake3 is unavailable, ZEUS will fall back to SHA-256, ensuring compatibility across older infrastructures.

🏢 **Legacy Function Naming:**  
- `legacyUnixToZeus()` → Converts UNIX to ZEUS hash using SHA-256.  
- `legacyZeusToUnix()` → Attempts UNIX conversion but is not cryptographically reversible.  

---

## 🤡 Test Results

ZEUS has passed all unit tests for functionality, security, and legacy compatibility.

👉 10/10 Tests Passed  
👉 Validates timestamps correctly (Ensures input is formatted and normalized properly)  
👉 Ensures deterministic hashing (Same input always produces the same secure hash)  
👉 Supports legacy SHA-256 fallback (Ensures compatibility with older systems if BLAKE3 is unavailable)  
👉 Prevents invalid time manipulation (Rejects malformed, tampered, or unrealistic timestamps)  
👉 Ensures consistent hash output across formats (Tests Date objects, ISO strings, and UNIX timestamps)  
👉 Handles extreme dates correctly (Validates UNIX epoch and future dates like 2999-12-31)  
👉 Rejects invalid inputs (Throws errors for undefined, null, and malformed timestamps)  
👉 Performance benchmark confirmed (**1000 hashes computed in 12ms**)  

Run tests yourself:

```sh
yarn test
```

---

## 🔒 Security & Trust

ZEUS ensures **time integrity** without requiring a centralized authority. Hashes are **tamper-proof** and **deterministically generated**, making it impossible to predict or manipulate timestamps in advance.

---

## 💚 License

Licensed under **Apache 2.0**, ensuring open-source innovation while protecting integrity.

---

## 🚀 Join the Revolution

**UNIX is outdated. ZEUS is the future.**  
Get started today and be part of the next evolution in timekeeping!

LFCROOOOOOO!!!!  🔥⚡

## Versioning note

Version 0.1.x is the stable legacy line.
It preserves deterministic behavior and API continuity.
No breaking changes are introduced in patch releases.

For the evolving compatibility and clarified semantics line, see the 0.2.x releases.
