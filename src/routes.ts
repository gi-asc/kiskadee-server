import express, { Request, Response } from 'express'
import { makeUserController } from './factories/makeUserController'
export const routes = express.Router()

routes.post('/users', (req: Request, res: Response) => makeUserController().create(req, res))