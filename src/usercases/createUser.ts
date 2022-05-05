import { UserModel } from "../models/users";
import { ICreateUser } from "./ICreateUser";
import { IValidateUser } from "./IValidateUser";
import { prisma } from '../prisma'
import { IEncrypter } from "../adapters/IEncrypter.1";
import { ISendMailConfirmation } from "../adapters/ISendMailConfirmation";
import { AppError } from "../errors/AppError";
import { IUserRepository } from "../repositories/IUserRepository";

export class CreateUser implements ICreateUser {
    constructor(private userRepository: IUserRepository, private validateUser: IValidateUser, private encrypter: IEncrypter, private sendMailConfirmation: ISendMailConfirmation){
    }

    async execute(data: any): Promise<UserModel> {
        const fields = ['email', 'userName', 'name', 'password']
        for(const field of fields){
            if(!data[field]){
                throw new AppError(`Missing param ${field}`, 400)
            }
        }
        const { email, userName, name, password } = data
        await this.validateUser.execute({email, userName})
        const hashPassword = await this.encrypter.encrypt(password)
        const tokenConfirmation = await this.encrypter.encrypt(email)
        const url = process.env.BASE_URL + '/' + tokenConfirmation
        await this.sendMailConfirmation.sendMail(email, url)
        const user = await this.userRepository.create({
            email,
            userName,
            name,
            password: hashPassword,
            tokenConfirmation
        })
        return user}
}