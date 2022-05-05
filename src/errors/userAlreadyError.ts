export class UserAlreadyError extends Error {
    constructor() {
        super(`User is already!`)
    }
}