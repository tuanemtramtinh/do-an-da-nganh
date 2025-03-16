import { Request, Response } from 'express'
import Engine from '~/models/engine.model'
import { EngineService } from '~/services/engine.service'
import { Controller } from '../index.controller'

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
}
