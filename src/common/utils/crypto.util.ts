import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
  scrypt,
  CipherGCM,
  DecipherGCM,
} from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

export class CryptoUtil {
  private static algorithm = 'aes-256-gcm';
  private static keyLength = 32;
  private static ivLength = 12; // GCM standard IV length
  private static saltLength = 16; // Reduced for compact storage
  private static tagLength = 16;
  private static tagPosition = this.saltLength + this.ivLength;
  private static encryptedPosition = this.tagPosition + this.tagLength;

  private static getEncryptionKey(): string {
    const key = process.env.ENCRYPTION_KEY;
    if (!key) {
      throw new Error(
        'ENCRYPTION_KEY is not set in environment variables. Please add it to your .env file.',
      );
    }
    return key;
  }

  /**
   * Encrypt a string value
   * @param text - Plain text to encrypt
   * @returns Encrypted string in base64 format (compact for VARCHAR(100))
   */
  static async encrypt(text: string): Promise<string> {
    const password = this.getEncryptionKey();
    const salt = randomBytes(this.saltLength);
    const iv = randomBytes(this.ivLength);

    const key = (await scryptAsync(password, salt, this.keyLength)) as Buffer;
    const cipher = createCipheriv(this.algorithm, key, iv) as CipherGCM;

    const encrypted = Buffer.concat([
      cipher.update(text, 'utf8'),
      cipher.final(),
    ]);

    const tag = cipher.getAuthTag();

    return Buffer.concat([salt, iv, tag, encrypted]).toString('base64');
  }

  /**
   * Decrypt an encrypted string
   * @param encryptedBase64 - Encrypted string in base64 format
   * @returns Decrypted plain text
   */
  static async decrypt(encryptedBase64: string): Promise<string> {
    const password = this.getEncryptionKey();
    const data = Buffer.from(encryptedBase64, 'base64');

    const salt = data.subarray(0, this.saltLength);
    const iv = data.subarray(this.saltLength, this.tagPosition);
    const tag = data.subarray(this.tagPosition, this.encryptedPosition);
    const encrypted = data.subarray(this.encryptedPosition);

    const key = (await scryptAsync(password, salt, this.keyLength)) as Buffer;
    const decipher = createDecipheriv(this.algorithm, key, iv) as DecipherGCM;
    decipher.setAuthTag(tag);

    return decipher.update(encrypted) + decipher.final('utf8');
  }
}
