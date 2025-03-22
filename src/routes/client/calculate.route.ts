import express, { Router } from 'express'
import { CalculateController } from '~/controllers/client/calculate.controller'
import { inputRequestValidate } from '~/middlewares/request.middleware'
import Chapter1 from '~/models/chapter1.model'
import Input from '~/models/input.model'
import { CalculateService } from '~/services/calculate.service'
import { Chapter1Handler } from '~/services/handlers/chapter1.handler'
import { authMiddleware } from '../../middlewares/auth.middleware'

const router: Router = express.Router()

const chapter1Handler = new Chapter1Handler()
const calculateService = new CalculateService(Input, Chapter1, chapter1Handler)
const calculateController = new CalculateController(calculateService)

router.post('/input', authMiddleware, inputRequestValidate, calculateController.saveInput)

router.post('/chapter-1/stage-1', calculateController.chooseEngine)

router.post('/chapter-1/stage-2', calculateController.engineCharacteristic)

const calculateRouter = router
export default calculateRouter
