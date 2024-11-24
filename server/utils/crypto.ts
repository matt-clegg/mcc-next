import crypto from "crypto";

export async function encrypt(plaintext: string, password: string) {
  const algorithm = "aes-256-gcm";
  const salt = crypto.randomBytes(16);
  const iv = crypto.randomBytes(12);
  const keyLength = 32;

  const key = await new Promise<Buffer>((resolve, reject) => {
    crypto.pbkdf2(password, salt, 100000, keyLength, "sha256", (err, derivedKey) => {
      if (err) reject(err);
      else resolve(derivedKey);
    });
  });

  const cipher = crypto.createCipheriv(algorithm, key, iv);

  let encrypted = cipher.update(plaintext, "utf8", "hex");
  encrypted += cipher.final("hex");

  const authTag = cipher.getAuthTag();

  return Buffer.concat([salt, iv, authTag, Buffer.from(encrypted, "hex")]).toString("base64");
}

export async function decrypt(encryptedData: string, password: string) {
  const algorithm = "aes-256-gcm";
  const keyLength = 32;

  const encryptedBuffer = Buffer.from(encryptedData, "base64");

  const salt = encryptedBuffer.subarray(0, 16);
  const iv = encryptedBuffer.subarray(16, 28);
  const authTag = encryptedBuffer.subarray(28, 44);
  const ciphertext = encryptedBuffer.subarray(44);

  const key = await new Promise<Buffer>((resolve, reject) => {
    crypto.pbkdf2(password, salt, 100000, keyLength, "sha256", (err, derivedKey) => {
      if (err) reject(err);
      else resolve(derivedKey);
    });
  });

  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  decipher.setAuthTag(authTag);

  let decrypted = decipher.update(ciphertext, undefined, "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}
