import { Model } from 'mongoose'
import { IInputData } from '~/interfaces/input.interface'
import { CalculateHandler } from './handlers/calculate.handler'

export class CalculateService {
  private Input //Model

  constructor(Input: Model<IInputData>) {
    this.Input = Input
  }

  public saveInput = async (data: IInputData) => {
    const newInput = await this.Input.create(data)
    return newInput
  }

  public test = async (data: IInputData) => {
    const calculateHandler = new CalculateHandler(data)
    return await calculateHandler.run()
  }
}
