import { UserModel } from "../models/users";
import {prisma} from '../prisma'
import { User } from "@prisma/client";
import { IFindByEmail } from "./IFindByEmail";


export class FindByEmailUsecase implements IFindByEmail{
    async execute(email: string): Promise<UserModel> {
        const user = await prisma.user.findUnique({
            where: {
                email: email 
            }
        })
        return user as User
    }
}