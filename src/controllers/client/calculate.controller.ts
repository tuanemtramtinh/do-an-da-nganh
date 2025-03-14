import { Request, Response } from 'express'
import Input from '~/models/input.model'
import { successMessage } from '~/utils/helper'

class CalculateController {
  public async saveInput(req: Request, res: Response) {
    const data = await Input.create(req.body)
    successMessage(res, 'Lưu dữ liệu thành công', data)
  }
}

export const calculateController = new CalculateController()
