import { Request, Response } from 'express'
import { IInputData } from '~/interfaces/input.interface'
import { CalculateService } from '~/services/calculate.service'
import { Controller } from '../index.controller'

export class CalculateController extends Controller {
  private calculateService: CalculateService

  constructor(calculateService: CalculateService) {
    super()
    this.calculateService = calculateService
  }

  public saveInput = async (req: Request, res: Response) => {
    const data = {
      ...req.body,
      userId: req.user?._id
    }
    const result = await this.calculateService.saveInput(data)
    this.successMessage(res, 'Lưu dữ liệu input thành công', result)
  }

  public chooseEngine = async (req: Request, res: Response) => {
    const inputId = req.body.inputId
    const result = await this.calculateService.chooseEngine(inputId)
    this.successMessage(res, 'Lưu input và trả ra danh sách động cơ thành công', result)
  }

  public engineCharacteristic = async (req: Request, res: Response) => {
    try {
      const inputId = req.body.inputId
      const engineId = req.body.engineId
      const result = await this.calculateService.engineCharacteristics(inputId, engineId)
      this.successMessage(res, 'Tính toán thành công', result)
    } catch (error: any) {
      this.failedMessage(res, error.message)
    }
  }
}
