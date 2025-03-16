import express, { Application } from 'express'
import dotenv from 'dotenv'
import { routeClient } from './routes/client/index.route'
import { Database } from './configs/config'
import cookieParser from 'cookie-parser'
import cors from 'cors'

dotenv.config()

const app: Application = express()
const port = process.env.PORT || 3000

const main = async () => {
  await Database.getInstance().connect()

  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(cookieParser())
  app.use(cors())

  routeClient(app)

  app.listen(port, () => {
    console.log('App listening on port', port)
  })
}

main()
