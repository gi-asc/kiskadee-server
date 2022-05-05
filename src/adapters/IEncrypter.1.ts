export interface IEncrypter {
    encrypt(value: string): Promise<string>;
    compare(value: string, comparator: string): Promise<boolean>;
}
