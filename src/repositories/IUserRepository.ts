import { UserModel } from "../models/users";

export interface ICreateUserRequest {
    name: string,
    email: string,
    userName: string,
    password: string,
    tokenConfirmation: string
}

export interface IUserRepository {
    create (data: ICreateUserRequest): Promise<UserModel>
}