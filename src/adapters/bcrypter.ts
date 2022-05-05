import bcrypt from 'bcrypt';
import { AppError } from '../errors/AppError';
import { IEncrypter } from "./IEncrypter.1";

export class BcryptAdapter implements IEncrypter {
    private readonly salt: number;

    constructor(salt: number) {
        this.salt = salt;
    }
    async compare(value: string, comparator: string): Promise<boolean> {
        try {
            return bcrypt.compare(value, comparator);
        } catch (error) {
            throw new AppError('encrypt error', 500);
        }
    }

    async encrypt(value: string): Promise<string> {
        try {
            const hash = await bcrypt.hash(value, this.salt);
            return hash;
        } catch (error) {
            throw new AppError('encrypt error', 500);
        }
    }
}