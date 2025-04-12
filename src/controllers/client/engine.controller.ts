import { Request, Response } from 'express'
import Engine from '~/models/engine.model'
import { EngineService } from '~/services/engine.service'
import { Controller } from '../index.controller'
import mongoose from 'mongoose'

export class EngineController extends Controller {
  private engineService: EngineService

  constructor(engineService: EngineService) {
    super()
    this.engineService = engineService
  }

  public saveEngine = async (req: Request, res: Response) => {
    const newEngine = await this.engineService.saveEngine(req.body)
    this.successMessage(res, 'Lưu dữ liệu động cơ thành công', newEngine)
  }

  public getEngineList = async (req: Request, res: Response) => {
    const page = req.query.page ? parseInt(req.query.page as string) : 1
    const keyword = req.query.keyword ? (req.query.keyword as string) : ''

    const engines = await this.engineService.getEngineList(page, keyword)
    this.successMessage(res, 'Lấy danh sách động cơ thành công', engines)
  }

  public getEngineDetail = async (req: Request, res: Response) => {
    try {
      const engineCode = req.params.engineCode
      const engine = await this.engineService.getEngineDetail(engineCode)
      this.successMessage(res, 'Lấy chi tiết động cơ thành công', engine)
    } catch (error: any) {
      this.failedMessage(res, error.message)
    }
  }
}
