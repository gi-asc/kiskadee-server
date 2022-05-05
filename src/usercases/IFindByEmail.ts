import { UserModel } from "../models/users";
import { IUsecase } from "./IUsecases";

export interface IFindByEmail extends IUsecase {
    execute(email: string): Promise<UserModel>
}