import { UserModel } from "../models/users";
import { IUsecase } from "./IUsecases";

export interface ICreateUserRequest {
    name: string,
    email: string,
    userName: string,
    password: string,
}

export interface ICreateUser extends IUsecase {
    execute(data: ICreateUserRequest): Promise<UserModel>
}