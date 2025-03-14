import express, { Router } from 'express'
import engineController from '~/controllers/client/engine.controller'

const router: Router = express.Router()

router.post('/', engineController.saveEngine)

const engineRouter = router
export default engineRouter
