import * as Crypto from 'expo-crypto';

const ROUNDS = 300;

export function randomHex(bytes = 16): string {
  return Array.from(Crypto.getRandomBytes(bytes), (b) => b.toString(16).padStart(2, '0')).join('');
}

/** Hachage itéré SHA-256 avec sel. Barrière locale (voir docs/revue-experts.md, C-09). */
export async function hashSecret(secret: string, salt: string): Promise<string> {
  let h = `${salt}:${secret}`;
  for (let i = 0; i < ROUNDS; i++) {
    h = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, `${salt}${h}`);
  }
  return h;
}

export function newRecoveryCode(): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const bytes = Crypto.getRandomBytes(8);
  const chars = Array.from(bytes, (b) => alphabet[b % alphabet.length]).join('');
  return `${chars.slice(0, 4)}-${chars.slice(4)}`;
}

export const normalizeRecovery = (s: string) => s.toUpperCase().replace(/[^A-Z0-9]/g, '');
