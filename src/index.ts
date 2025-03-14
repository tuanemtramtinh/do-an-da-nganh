import express, { Application } from 'express'
import dotenv from 'dotenv'
import { routeClient } from './routes/client/index.route'
import { Database } from './configs/config'

dotenv.config()

const app: Application = express()
const port = process.env.PORT || 3000

const main = async () => {
  await Database.getInstance().connect()

  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))

  routeClient(app)

  app.listen(port, () => {
    console.log('App listening on port', port)
  })
}

main()
