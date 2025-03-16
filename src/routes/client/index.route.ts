import { Application, Request, Response } from 'express'
import homeRouter from './home.route'
import calculateRouter from './calculate.route'
import engineRouter from './engine.route'
import userRouter from './user.route'
import { authMiddleware } from '~/middlewares/auth.middleware'

export const routeClient = (app: Application) => {
  app.get('/', authMiddleware, (req: Request, res: Response): any => {
    res.json('Auth Complete')
  })
  app.use('/home', homeRouter)
  app.use('/calculate', calculateRouter)
  app.use('/engine', engineRouter)
  app.use('/user', userRouter)
}
