import { Model } from 'mongoose'

export class EngineService {
  private Engine: Model<any>
  constructor(Engine: Model<any>) {
    this.Engine = Engine
  }

  public saveEngine = async (data: any) => {
    const newEngine = await this.Engine.create(data)
    return newEngine
  }
}
