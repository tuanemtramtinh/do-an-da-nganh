import express, { Request, Response, Router } from 'express'
import { CalculateController } from '~/controllers/client/calculate.controller'
import { inputRequestValidate } from '~/middlewares/request.middleware'
import Input from '~/models/input.model'
import { CalculateService } from '~/services/calculate.service'

const router: Router = express.Router()

const calculateService = new CalculateService(Input)
const calculateController = new CalculateController(calculateService)

router.post('/', inputRequestValidate, calculateController.saveInput)

const calculateRouter = router
export default calculateRouter
