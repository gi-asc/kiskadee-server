import { IUsecase } from "./IUsecases";

export interface IValidateUserRequest {
    email: string,
    userName: string,
}

export interface IValidateUser extends IUsecase {
    execute(data: IValidateUserRequest): Promise<boolean>
}