import { IEmailValidator } from "./IEmailValidator";
import validator from 'validator'

export class EmailValidator implements IEmailValidator {
    isValid(email: string): boolean {
        return validator.isEmail(email)
    }

}