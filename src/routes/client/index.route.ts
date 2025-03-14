import { Application, Request, Response } from 'express'
import homeRouter from './home.route'
import calculateRouter from './calculate.route'
import engineRouter from './engine.route'

export const routeClient = (app: Application) => {
  app.use('/home', homeRouter)
  app.use('/calculate', calculateRouter)
  app.use('/engine', engineRouter)

  app.get('/', (req: Request, res: Response) => {
    res.json('Hello World')
  })
}
