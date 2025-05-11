import { Router } from 'express'
import express from 'express'
import { ExportController } from '~/controllers/client/export.controller'
import Chapter1 from '~/models/chapter1.model'
import Chapter2 from '~/models/chapter2.model'
import Chapter3 from '~/models/chapter3.model'
import Chapter4 from '~/models/chapter4.model'
import Chapter5 from '~/models/chapter5.model'
import Chapter6 from '~/models/chapter6.model'
import Chapter7 from '~/models/chapter7.model'
import { ExportService } from '~/services/export.service'

const router: Router = express.Router()

const exportService = new ExportService(Chapter1, Chapter2, Chapter3, Chapter4, Chapter5, Chapter6, Chapter7)
const exportController = new ExportController(exportService)

router.get('/chapter-1/:inputId', exportController.exportChapter1)

router.get('/chapter-2/:inputId', exportController.exportChapter2)

router.get('/chapter-3/:inputId', exportController.exportChapter3)

router.get('/chapter-4/:inputId', exportController.exportChapter4)

router.get('/chapter-5/:inputId', exportController.exportChapter5)

router.get('/chapter-6/:inputId', exportController.exportChapter6)

router.get('/chapter-7/:inputId', exportController.exportChapter7)
const exportRouter = router
export default exportRouter
