import express, { Router } from 'express'
import { CalculateController } from '~/controllers/client/calculate.controller'
import { inputRequestValidate } from '~/middlewares/request.middleware'
import { CalculateService } from '~/services/calculate.service'
import { authMiddleware } from '../../middlewares/auth.middleware'
import multer from 'multer'
import Input from '~/models/input.model'
import Chapter1 from '~/models/chapter1.model'
import Chapter2 from '~/models/chapter2.model'
import Chapter3 from '~/models/chapter3.model'
import Chapter4 from '~/models/chapter4.model'
import Chapter5 from '~/models/chapter5.model'
import Chapter6 from '~/models/chapter6.model'
import Chapter7 from '~/models/chapter7.model'

const router: Router = express.Router()

const upload = multer()

const calculateService = new CalculateService(
  Input,
  Chapter1,
  Chapter2,
  Chapter3,
  Chapter4,
  Chapter5,
  Chapter6,
  Chapter7
)
const calculateController = new CalculateController(calculateService)

router.post('/input', authMiddleware, inputRequestValidate, calculateController.saveInput)

router.get('/input', calculateController.getInput)

router.post('/ai', upload.single('image'), calculateController.uploadInputImage)

router.get('/chapter-1', calculateController.handleChapter1)

router.get('/chapter-2', calculateController.handleChapter2)

router.get('/chapter-3', calculateController.handleChapter3)

router.get('/chapter-4', calculateController.handleChapter4)

router.get('/chapter-5', calculateController.handleChapter5)

router.get('/chapter-6', calculateController.handleChapter6)

router.get('/chapter-7', calculateController.handleChapter7)

const calculateRouter = router
export default calculateRouter
