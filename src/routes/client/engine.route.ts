import express, { Request, Response, Router } from 'express'
import { EngineController } from '~/controllers/client/engine.controller'
import Engine from '~/models/engine.model'
import { EngineService } from '~/services/engine.service'

const router: Router = express.Router()

const engineService = new EngineService(Engine)
const engineController = new EngineController(engineService)

router.post('/', engineController.saveEngine)

// router.get('/')

const engineRouter = router
export default engineRouter
