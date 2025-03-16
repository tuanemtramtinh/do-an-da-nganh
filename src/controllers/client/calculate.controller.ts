import { Request, Response } from 'express'
import { IInputData } from '~/interfaces/input.interface'
import Input from '~/models/input.model'
import { CalculateService } from '~/services/calculate.service'
import { Controller } from '../index.controller'

export class CalculateController extends Controller {
  private calculateService: CalculateService

  constructor(calculateService: CalculateService) {
    super()
    this.calculateService = calculateService
  }

  public saveInput = async (req: Request, res: Response) => {
    const data: IInputData = await this.calculateService.saveInput(req.body)
    this.successMessage(res, 'Lưu dữ liệu thành công', data)
  }
}
