import { Request, Response } from 'express'
import { CalculateService } from '~/services/calculate.service'
import { Controller } from '../index.controller'
import mongoose from 'mongoose'

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

  public getChapter1 = async (req: Request, res: Response) => {
    try {
      const inputId = req.query.inputId

      if (typeof inputId !== 'string' || !mongoose.Types.ObjectId.isValid(inputId)) {
        this.failedMessage(res, 'Invalid inputId')
        return
      }

      const inputObjectId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(inputId)

      const result = await this.calculateService.getChapter1(inputObjectId)
      this.successMessage(res, 'Lấy chương 1 thành công', result)
    } catch (error: any) {
      this.failedMessage(res, error.message)
    }
  }

  public handleChapter2 = async (req: Request, res: Response) => {
    try {
      const inputId = req.query.inputId

      if (typeof inputId !== 'string' || !mongoose.Types.ObjectId.isValid(inputId)) {
        this.failedMessage(res, 'Invalid inputId')
        return
      }

      const inputObjectId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(inputId)
      let result = await this.calculateService.getChapter2(inputObjectId)
      if (!result) {
        result = await this.calculateService.handleChapter2(inputObjectId)
      }
      this.successMessage(res, 'Tính toán chương 2 thành công', result)
    } catch (error: any) {
      this.failedMessage(res, error.message)
    }
  }
}
