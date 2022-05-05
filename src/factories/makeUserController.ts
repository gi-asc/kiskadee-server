import { UserController } from "../controllers/user"
import { makeCreateUser } from "./makeCreateUser"

export const makeUserController = (): UserController => {
    const createUser = makeCreateUser()
    return new UserController(createUser)
}