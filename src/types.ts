export type ZeusAlgorithm = "blake3" | "sha256";
export type ZeusFormat = "hex" | "base64url";

export interface ZeusOptions {
  algorithm?: ZeusAlgorithm;
  format?: ZeusFormat;
}
