import { UserAlreadyError } from "../errors/userAlreadyError";
import { UserModel } from "../models/users";
import { ICreateUser, ICreateUserRequest } from "./ICreateUser";
import { IValidateUser } from "./IValidateUser";
import { prisma } from '../prisma'
import { IEncrypter } from "../adapters/IEncrypter.1";
import { ISendMailConfirmation } from "../adapters/ISendMailConfirmation";

export class CreateUser implements ICreateUser {
    constructor(private validateUser: IValidateUser, private encrypter: IEncrypter, private sendMailConfirmation: ISendMailConfirmation){
    }

    async execute(data: ICreateUserRequest): Promise<UserModel> {
        const { email, userName, name, password } = data
        const isValid = await this.validateUser.execute({email, userName})
        if(!isValid){
            throw new UserAlreadyError()
        }
        const hashPassword = await this.encrypter.encrypt(password)
        const tokenConfirmation = await this.encrypter.encrypt(email)
        const url = process.env.BASE_URL + '/' + tokenConfirmation
        await this.sendMailConfirmation.sendMail(email, url)
        const user = await prisma.user.create({
            data: {
            email,
            name,
            password: hashPassword,
            userName,
            isConfirmed: false,
            tokenConfirmation: tokenConfirmation
            }
        })
        return user as UserModel
    }
}