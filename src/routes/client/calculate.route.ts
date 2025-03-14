import express, { Router } from 'express'
import { calculateController } from '~/controllers/client/calculate.controller'
import { inputRequestValidate } from '~/middlewares/request.middleware'

const router: Router = express.Router()

router.post('/', inputRequestValidate, calculateController.saveInput)

const calculateRouter = router
export default calculateRouter
