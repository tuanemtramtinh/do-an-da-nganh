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

  public exportChapter3 = async (req: Request, res: Response) => {
    const inputId: any = req.params.inputId
    const pdfBuffer = await this.exportService.exportChapter3(inputId)
    res.contentType('application/pdf')
    res.setHeader('Content-Disposition', 'inline; filename="chapter1.pdf"')
    res.setHeader('Content-Length', pdfBuffer.length)
    res.end(pdfBuffer)
  }

  public exportChapter4 = async (req: Request, res: Response) => {
    const inputId: any = req.params.inputId
    const pdfBuffer = await this.exportService.exportChapter4(inputId)
    res.contentType('application/pdf')
    res.setHeader('Content-Disposition', 'inline; filename="chapter1.pdf"')
    res.setHeader('Content-Length', pdfBuffer.length)
    res.end(pdfBuffer)
  }

  public exportChapter5 = async (req: Request, res: Response) => {
    const inputId: any = req.params.inputId
    const pdfBuffer = await this.exportService.exportChapter5(inputId)
    res.contentType('application/pdf')
    res.setHeader('Content-Disposition', 'inline; filename="chapter1.pdf"')
    res.setHeader('Content-Length', pdfBuffer.length)
    res.end(pdfBuffer)
  }

  public exportChapter6 = async (req: Request, res: Response) => {
    const inputId: any = req.params.inputId
    const pdfBuffer = await this.exportService.exportChapter6(inputId)
    res.contentType('application/pdf')
    res.setHeader('Content-Disposition', 'inline; filename="chapter1.pdf"')
    res.setHeader('Content-Length', pdfBuffer.length)
    res.end(pdfBuffer)
  }

  public exportChapter7 = async (req: Request, res: Response) => {
    const inputId: any = req.params.inputId
    const pdfBuffer = await this.exportService.exportChapter7(inputId)
    res.contentType('application/pdf')
    res.setHeader('Content-Disposition', 'inline; filename="chapter1.pdf"')
    res.setHeader('Content-Length', pdfBuffer.length)
    res.end(pdfBuffer)
  }
}
