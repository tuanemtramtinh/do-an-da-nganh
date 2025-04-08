import { ExportService } from '~/services/export.service'
import { Controller } from '../index.controller'
import { Request, Response } from 'express'

export class ExportController extends Controller {
  private exportService: ExportService

  constructor(exportService: ExportService) {
    super()
    this.exportService = exportService
  }

  public exportChapter1 = async (req: Request, res: Response) => {
    const inputId: any = req.params.inputId
    const pdfBuffer = await this.exportService.exportChapter1(inputId)
    res.contentType('application/pdf')
    res.setHeader('Content-Disposition', 'inline; filename="chapter1.pdf"')
    res.setHeader('Content-Length', pdfBuffer.length)
    res.end(pdfBuffer)
  }

  public exportChapter2 = async (req: Request, res: Response) => {
    const inputId: any = req.params.inputId
    const pdfBuffer = await this.exportService.exportChapter2(inputId)
    res.contentType('application/pdf')
    res.setHeader('Content-Disposition', 'inline; filename="chapter1.pdf"')
    res.setHeader('Content-Length', pdfBuffer.length)
    res.end(pdfBuffer)
  }
}
