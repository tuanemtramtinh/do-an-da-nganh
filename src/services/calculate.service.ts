import mongoose, { Model } from 'mongoose'
import { IInputData } from '~/interfaces/input.interface'
// import { CalculateHandler } from './handlers/calculate.handler'
import { Chapter1Handler } from './handlers/chapter1.handler'
import Engine from '~/models/engine.model'

export class CalculateService {
  private Input //Model
  private Chapter1 //Model
  private chapter1Handler: Chapter1Handler

  constructor(Input: Model<IInputData>, Chapter1: Model<any>, chapter1Handler: Chapter1Handler) {
    this.Input = Input
    this.Chapter1 = Chapter1
    this.chapter1Handler = chapter1Handler
  }

  public saveInput = async (data: IInputData) => {
    const newInput = await this.Input.create(data)
    const chapter1 = new this.Chapter1()
    chapter1.inputId = newInput._id
    chapter1.status = 'initial'
    await chapter1.save()
    return newInput
  }

  //Chapter 1 - Stage 1
  public chooseEngine = async (inputId: mongoose.Schema.Types.ObjectId) => {
    //Lưu input người dùng nhập
    const input: IInputData | null = await this.Input.findById(inputId)
    if (!input) {
      throw Error('Input Id không hợp lệ')
    }
    const stage1Result: any = await this.chapter1Handler.stage1(input)
    const n_lv = stage1Result.n_lv
    const P_td = stage1Result.P_td
    const engines = stage1Result.engines
    await this.Chapter1.updateOne(
      {
        inputId: inputId
      },
      {
        n_lv: n_lv,
        P_td: P_td,
        status: 'processing'
      }
    )

    // chapter1.n_lv = n_lv
    // chapter1.P_td = P_td
    // chapter1.status = 'processing'
    return {
      inputId: input._id,
      engines
    }
  }

  //Chapter 1 - Stage 2
  public engineCharacteristics = async (
    inputId: mongoose.Schema.Types.ObjectId,
    engineId: mongoose.Schema.Types.ObjectId
  ) => {
    const engine = await Engine.findById(engineId)

    const currentChapter1 = await this.Chapter1.findOne({
      inputId: inputId
    })

    if (!currentChapter1) {
      throw Error('Id của Input không hợp lệ')
    }

    const result = this.chapter1Handler.stage2(currentChapter1.n_lv, currentChapter1.P_td, engine)
    const chapter1 = await this.Chapter1.findOneAndUpdate(
      {
        inputId: inputId
      },
      {
        ...result,
        engineId: engineId,
        status: 'finish'
      },
      {
        new: true
      }
    )
    return chapter1
  }

  //Get Chapter 1
  public getChapter1 = async (inputId: mongoose.Schema.Types.ObjectId) => {
    const chapter1 = await this.Chapter1.findOne({
      inputId: inputId
    }).populate('engineId')

    if (chapter1) {
      return chapter1
    } else {
      throw Error('Chưa tồn tại Chương 1 với inputId này')
    }
  }
}
