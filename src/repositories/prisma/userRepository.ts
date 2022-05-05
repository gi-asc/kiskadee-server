import { UserModel } from "../../models/users";
import { prisma } from "../../prisma";
import { ICreateUserRequest, IUserRepository } from "../IUserRepository";

export class PrismaUserRepository implements IUserRepository {
    async create(data: ICreateUserRequest): Promise<UserModel> {
        const { email, name, password, userName, tokenConfirmation} = data
            const user = await prisma.user.create({
            data: {
            email,
            name,
            password,
            userName,
            isConfirmed: false,
            tokenConfirmation
            }
        })
        return user as UserModel
    }

}