import 'express-async-errors'
import express, { Request, Response, NextFunction} from 'express'
import cors from 'cors'
import{ routes }from './routes'
import { AppError } from './errors/AppError'
const app = express()

app.use(cors())
app.use(express.json())

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }
    return response.status(400).json({
      status: 'error',
      message: error.message,
    });
    next();
  },
);
app.use(routes)
app.listen(3330, () => console.log('Server is running!') )