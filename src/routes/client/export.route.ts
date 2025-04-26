import { Router } from 'express'
import express from 'express'
import { ExportController } from '~/controllers/client/export.controller'
import Chapter1 from '~/models/chapter1.model'
import Chapter2 from '~/models/chapter2.model'
import Chapter3 from '~/models/chapter3.model'
import { ExportService } from '~/services/export.service'

const router: Router = express.Router()

const exportService = new ExportService(Chapter1, Chapter2, Chapter3)
const exportController = new ExportController(exportService)

router.get('/chapter-1/:inputId', exportController.exportChapter1)

router.get('/chapter-2/:inputId', exportController.exportChapter2)

router.get('/chapter-3/:inputId', exportController.exportChapter3)

const exportRouter = router
export default exportRouter
