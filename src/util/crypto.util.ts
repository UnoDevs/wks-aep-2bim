import { createCipheriv, randomBytes, scrypt, createDecipheriv } from 'crypto';
import { promisify } from 'util';


export async function encryptText(pass: string, crypPass: string) {
    const iv = randomBytes(16);
    const key = (await promisify(scrypt)(crypPass, 'salt', 32)) as Buffer;
  
    const cipher = createCipheriv('aes-256-ctr', key, iv);
    const encryptedText = Buffer.concat([cipher.update(pass), cipher.final()]);
  
    return { iv: iv.toString('hex'), cripPass: encryptedText.toString('hex') };
}

export async function decryptText(encryptedData: { iv: string; encryptedText: string }, crypPass: string): Promise<string> {
    const { iv, encryptedText } = encryptedData;
    const key = (await promisify(scrypt)(crypPass, 'salt', 32)) as Buffer;
  
    const decipher = createDecipheriv('aes-256-ctr', key, Buffer.from(iv, 'hex'));
    const decryptedText = Buffer.concat([decipher.update(Buffer.from(encryptedText, 'hex')), decipher.final()]);
  
    return decryptedText.toString();
}