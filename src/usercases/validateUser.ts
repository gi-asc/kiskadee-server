import { IEmailValidator } from "../adapters/IEmailValidator";
import { AppError } from "../errors/AppError";
import { IFindByEmail } from "./IFindByEmail";
import { IFindByUserName } from "./IFindByUserName";
import { IUsecase } from "./IUsecases";
import { IValidateUserRequest } from "./IValidateUser";

export class ValidateUser implements IUsecase {
    constructor(
        private emailValidator: IEmailValidator,
        private findByEmail: IFindByEmail,
        private findByUserName: IFindByUserName
        ){}
    async execute(data: IValidateUserRequest): Promise<boolean> {
        const {email, userName} = data
        const emailIsValid = this.emailValidator.isValid(email)
        const emailAlready = await this.findByEmail.execute(email)
        const userNameAlready = await this.findByUserName.execute(userName)
        if(!emailIsValid){
            throw new AppError('Invalid email', 400)
        }
        if(emailAlready){
            throw new AppError('email already exists', 400)
        }
        if(userNameAlready !== null){
            throw new AppError('userName already exists', 400)
        }
        return true
    }
}