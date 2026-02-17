export type { ZeusAlgorithm, ZeusFormat, ZeusOptions } from "./types";

export { normalizeTime } from "./normalize";

export {
  zeusHash,
  generateZeusHash,
  verifyZeusHash,
  unixToZeusSync,
  unixToZeus,
  zeusToUnix
} from "./api";

export { legacyUnixToZeus, legacyZeusHash } from "./legacy";

// v0.1 compatibility helpers
export { validateZeusTimestamp, executeAtZeusEpoch, legacyZeusToUnix } from "./compat";

export {
  isValidUnixTimestampSeconds,
  isValidZeusHex,
  isValidZeusBase64Url
} from "./validation";

// ZPK1 packed payload helpers
export type { CanonMode, HashAlgo, PackOptions, ZPKParsed } from "./zpk";
export { packZPK1, unpackZPK1, isValidZPK1 } from "./zpk";
