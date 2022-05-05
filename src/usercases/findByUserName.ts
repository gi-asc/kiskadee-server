import { UserModel } from "../models/users";
import { IUsecase } from "./IUsecases";
import {prisma} from '../prisma'
import { User } from "@prisma/client";
import { IFindByUserName } from "./IFindByUserName";


export class FindByUserNameUsecase implements IFindByUserName{
    async execute(userName: string): Promise<UserModel> {
        const user = await prisma.user.findUnique({
            where: {
                userName: userName 
            }
        })
        return user as User
    }
}