import { Model } from 'mongoose'
import { IInputData } from '~/interfaces/input.interface'

export class CalculateService {
  private Input //Model

  constructor(Input: Model<IInputData>) {
    this.Input = Input
  }

  public saveInput = async (data: IInputData) => {
    const newInput = await this.Input.create(data)
    return newInput
  }
}
