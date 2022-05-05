import { BcryptAdapter } from "../adapters/bcrypter"
import { EmailValidator } from "../adapters/emailValidator"
import { SendEmailConfirmation } from "../adapters/sendMailConfirmation"
import { PrismaUserRepository } from "../repositories/prisma/userRepository"
import { CreateUser } from "../usercases/createUser"
import { FindByEmailUsecase } from "../usercases/findByEmail"
import { FindByUserNameUsecase } from "../usercases/findByUserName"
import { ValidateUser } from "../usercases/validateUser"

export const makeCreateUser = (): CreateUser => {
    const emailValidator = new EmailValidator()
    const findByEmail = new FindByEmailUsecase()
    const findByUserName = new FindByUserNameUsecase()
    const validateUser = new ValidateUser(emailValidator, findByEmail, findByUserName)
    const encrypter = new BcryptAdapter(12)
    const sendMailConfirmation = new SendEmailConfirmation()
    const userRepository = new PrismaUserRepository()
    return new CreateUser(userRepository, validateUser, encrypter, sendMailConfirmation)
}