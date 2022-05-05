import { IValidator } from './IValidator';

export interface IEmailValidator extends IValidator {
    isValid(email: string): boolean;
}
