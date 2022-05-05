import { Request, Response } from "express";
import { ICreateUser } from "../usercases/ICreateUser";

export class UserController {
    constructor(private createUser: ICreateUser){}
    async create(req: Request, res: Response){
        await this.createUser.execute(req.body)
        res.status(201).send()
    }
}