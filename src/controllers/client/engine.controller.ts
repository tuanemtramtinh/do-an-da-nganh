import { Request, Response } from 'express'
import Engine from '~/models/engine.model'
import { successMessage } from '~/utils/helper'

export class EngineController {
  public async saveEngine(req: Request, res: Response) {
    const data = req.body
    const newEngine = await Engine.create(data)
    successMessage(res, 'Lưu dữ liệu động cơ thành công', newEngine)
  }
}

const engineController = new EngineController()
export default engineController
