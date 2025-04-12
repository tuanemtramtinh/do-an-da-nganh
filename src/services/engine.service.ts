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

  public getEngineList = async (page: number, keyword: string) => {
    const find: object = {
      kieu_dong_co: new RegExp(keyword, 'i')
    }

    const limit = 9
    const skip = (page - 1) * limit

    const totalEngine = await this.Engine.countDocuments(find)
    const totalPage = Math.ceil(totalEngine / limit)

    const engines = await this.Engine.find(find).limit(limit).skip(skip)
    return {
      engines,
      totalPage
    }
  }

  public getEngineDetail = async (engineCode: string) => {
    const engine = await this.Engine.findOne({
      kieu_dong_co: engineCode
    })

    if (!engine) {
      throw Error('Mã động cơ không hợp lệ')
    }

    return engine
  }
}
