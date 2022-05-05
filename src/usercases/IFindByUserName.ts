import { UserModel } from "../models/users";
import { IUsecase } from "./IUsecases";

export interface IFindByUserName extends IUsecase {
    execute(userName: string): Promise<UserModel>
}