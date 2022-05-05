import { UserModel } from "../models/users";
import { IUsecase } from "./IUsecases";


export interface ICreateUser extends IUsecase {
    execute(data: any): Promise<UserModel>
}