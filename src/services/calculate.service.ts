import mongoose, { Model } from 'mongoose'
import { IInputData } from '~/interfaces/input.interface'
import { Chapter1Handler } from './handlers/chapter1/chapter1.handler'
import { Chapter2Handler } from './handlers/chapter2/chapter2.handler'
import { Chapter3Handler } from './handlers/chapter3/chapter3.handler'
import { Chapter4Handler } from './handlers/chapter4/chapter4.handler'
import { Chapter5Handler } from './handlers/chapter5/chapter5.handler'
import { Chapter6Handler } from './handlers/chapter6/chapter6.handler'
import { Chapter7Handler } from './handlers/chapter7/chapter7.handler'

export class CalculateService {
  private Input //Model
  private Chapter1 //Model
  private Chapter2 //Model
  private Chapter3 //Model
  private Chapter4 //Model
  private Chapter5 //Model
  private Chapter6 //Model
  private Chapter7 //Model

  constructor(
    Input: Model<IInputData>,
    Chapter1: Model<any>,
    Chapter2: Model<any>,
    Chapter3: Model<any>,
    Chapter4: Model<any>,
    Chapter5: Model<any>,
    Chapter6: Model<any>,
    Chapter7: Model<any>
  ) {
    this.Input = Input
    this.Chapter1 = Chapter1
    this.Chapter2 = Chapter2
    this.Chapter3 = Chapter3
    this.Chapter4 = Chapter4
    this.Chapter5 = Chapter5
    this.Chapter6 = Chapter6
    this.Chapter7 = Chapter7
  }

  public saveInput = async (data: IInputData) => {
    const newInput = await this.Input.create(data)
    const chapter1 = new this.Chapter1()
    chapter1.inputId = newInput._id
    chapter1.status = 'initial'
    await chapter1.save()
    return newInput
  }

  public getInput = async (inputId: mongoose.Types.ObjectId) => {
    const input = await this.Input.findById(inputId)

    if (!input) {
      throw Error('Input Id không hợp lệ')
    }

    return input
  }

  // //Chapter 1 - Stage 1
  // public chooseEngine = async (inputId: mongoose.Types.ObjectId) => {
  //   //Lưu input người dùng nhập
  //   const input: IInputData | null = await this.Input.findById(inputId)
  //   if (!input) {
  //     throw Error('Input Id không hợp lệ')
  //   }
  //   const stage1Result: any = await this.chapter1Handler.stage1(input)
  //   const n_lv = stage1Result.n_lv
  //   const P_td = stage1Result.P_td
  //   const engines = stage1Result.engines
  //   await this.Chapter1.updateOne(
  //     {
  //       inputId: inputId
  //     },
  //     {
  //       n_lv: n_lv,
  //       P_td: P_td,
  //       status: 'processing'
  //     }
  //   )

  //   // chapter1.n_lv = n_lv
  //   // chapter1.P_td = P_td
  //   // chapter1.status = 'processing'
  //   return {
  //     inputId: input._id,
  //     engines
  //   }
  // }

  // //Chapter 1 - Stage 2
  // public engineCharacteristics = async (inputId: mongoose.Types.ObjectId, engineId: mongoose.Types.ObjectId) => {
  //   const engine = await Engine.findById(engineId)

  //   const currentChapter1 = await this.Chapter1.findOne({
  //     inputId: inputId
  //   })

  //   if (!currentChapter1) {
  //     throw Error('Id của Input không hợp lệ')
  //   }

  //   const result = this.chapter1Handler.stage2(currentChapter1.n_lv, currentChapter1.P_td, engine)
  //   const chapter1 = await this.Chapter1.findOneAndUpdate(
  //     {
  //       inputId: inputId
  //     },
  //     {
  //       ...result,
  //       engineId: engineId,
  //       status: 'finish'
  //     },
  //     {
  //       new: true
  //     }
  //   )
  //   return chapter1
  // }

  // //Get Chapter 1
  // public getChapter1 = async (inputId: mongoose.Types.ObjectId) => {
  //   const chapter1 = await this.Chapter1.findOne({
  //     inputId: inputId
  //   }).populate('engineId')

  //   if (chapter1) {
  //     return chapter1
  //   } else {
  //     throw Error('Chưa tồn tại Chương 1 với inputId này')
  //   }
  // }

  public handleChapter1 = async (
    inputId: mongoose.Types.ObjectId,
    n_ol: number,
    n_tv: number,
    n_brt: number,
    n_d: number,
    n_kn: number,
    engine: mongoose.Types.ObjectId | null
  ) => {
    const input = await this.Input.findById(inputId)

    if (!input) {
      throw Error('InputId không hợp lệ')
    }

    let chapter1Result = await this.Chapter1.findOne({
      inputId: inputId
    }).populate('engineId')

    let request: string = ''
    if (!chapter1Result) {
      request = 'initial'
      const chapter1 = new this.Chapter1()
      chapter1.inputId = inputId
      chapter1.status = 'initial'
      await chapter1.save()
      return chapter1.toObject()
    }

    if (
      chapter1Result &&
      chapter1Result.status === 'initial' &&
      n_ol === -1 &&
      n_tv === -1 &&
      n_brt === -1 &&
      n_d === -1 &&
      n_kn === -1
    ) {
      return chapter1Result
    }

    if (
      chapter1Result &&
      chapter1Result.status === 'initial' &&
      n_ol !== -1 &&
      n_tv !== -1 &&
      n_brt !== -1 &&
      n_d !== -1 &&
      n_kn !== -1
    ) {
      chapter1Result = chapter1Result.toObject()
      chapter1Result.n_ol = n_ol
      chapter1Result.n_tv = n_tv
      chapter1Result.n_brt = n_brt
      chapter1Result.n_d = n_d
      chapter1Result.n_kn = n_kn
    }

    if (chapter1Result && chapter1Result.status === 'stage-1' && !engine) {
      return chapter1Result
    } else if (chapter1Result && chapter1Result.status === 'stage-1' && engine) {
      chapter1Result.engineId = engine
      await chapter1Result.save()
      chapter1Result = await this.Chapter1.findOne({ inputId: inputId }).populate('engineId')
      chapter1Result = chapter1Result.toObject()
    }

    request = chapter1Result.status

    const chapter1Handler = new Chapter1Handler(input, chapter1Result, request)
    const result = await chapter1Handler.run()

    if (request === 'initial') {
      // const { engines, ...data } = result.chapter1
      await this.Chapter1.updateOne(
        {
          inputId: inputId
        },
        {
          ...result.chapter1,
          status: 'stage-1'
        }
      )
    } else if (request === 'stage-1') {
      const { engines, ...data } = result.chapter1

      await this.Chapter1.updateOne(
        {
          inputId: inputId
        },
        {
          $set: {
            ...data,
            status: 'finish'
          },
          $unset: {
            engines: ''
          }
        }
      )
    }

    return result.chapter1
  }

  public handleChapter2 = async (inputId: mongoose.Types.ObjectId) => {
    const input = await this.Input.findById(inputId)

    if (!input) {
      throw Error('InputId không hợp lệ')
    }

    const chapter1Result = await this.Chapter1.findOne({
      inputId
    }).populate('engineId')

    const chapter2Handler = new Chapter2Handler(input, chapter1Result)
    const result = chapter2Handler.run()

    const chapter2 = new this.Chapter2()

    chapter2.inputId = inputId
    chapter2.beltParamaters = result.beltParameters
    chapter2.gearSpecification = result.gearSpecification
    chapter2.sizeOfTranmission = result.sizeOfTranmission
    chapter2.aw_test = result.aw_test

    await chapter2.save()

    return {
      aw_test: result.aw_test,
      beltParamaters: result.beltParameters,
      gearSpecification: result.gearSpecification,
      sizeOfTranmission: result.sizeOfTranmission
    }
  }

  public getChapter2 = async (inputId: mongoose.Types.ObjectId) => {
    const input = await this.Input.findById(inputId)

    if (!input) {
      throw Error('InputId không hợp lệ')
    }

    const chapter2 = await this.Chapter2.findOne({
      inputId
    })

    return chapter2
  }

  public handleChapter3 = async (
    inputId: mongoose.Types.ObjectId,
    lm12: number,
    lm22: number,
    lm23: number,
    lm34: number,
    lm33: number,
    F_nt: number
  ) => {
    const input = await this.Input.findById(inputId)

    if (!input) {
      throw Error('InputId không hợp lệ')
    }

    const chapter1Result = await this.Chapter1.findOne({
      inputId
    }).populate('engineId')

    const chapter2Result = await this.Chapter2.findOne({
      inputId
    })

    let chapter3Result = await this.Chapter3.findOne({
      inputId
    })

    if (chapter3Result) chapter3Result = chapter3Result.toObject()

    let request: string = ''

    // console.log({ lm12, lm22, lm23, lm34, lm33 })

    if (!chapter3Result) {
      request = 'initial'
      const chapter3 = new this.Chapter3()
      chapter3.inputId = inputId
      chapter3.status = 'initial'
      await chapter3.save()
      chapter3Result = chapter3.toObject()
    } else if (
      lm12 !== -1 &&
      lm22 !== -1 &&
      lm23 !== -1 &&
      lm34 !== -1 &&
      lm33 !== -1 &&
      chapter3Result.status === 'stage-1'
    ) {
      request = chapter3Result.status
      chapter3Result.lm12 = lm12
      chapter3Result.lm22 = lm22
      chapter3Result.lm23 = lm23
      chapter3Result.lm34 = lm34
      chapter3Result.lm33 = lm33
    } else if (F_nt != -1 && chapter3Result.status === 'stage-2') {
      request = chapter3Result.status
      chapter3Result.F_nt = F_nt
    }

    const chapter3Handler = new Chapter3Handler(input, chapter1Result, chapter2Result, chapter3Result, request)
    const result = chapter3Handler.run()
    // console.log(result)
    const chapter3 = result.chapter3
    if (request === 'initial') {
      await this.Chapter3.updateOne(
        {
          inputId: inputId
        },
        {
          $set: {
            ...chapter3,
            status: 'stage-1'
          },
          $unset: {
            Fnt_sau: '',
            Fnt_truoc: ''
          }
        }
      )
    } else if (request === 'stage-1') {
      await this.Chapter3.updateOne(
        {
          inputId: inputId
        },
        {
          ...chapter3,
          status: 'stage-2'
        }
      )
    } else if (request === 'stage-2') {
      await this.Chapter3.updateOne(
        {
          inputId: inputId
        },
        {
          ...chapter3,
          status: 'finish'
        }
      )
    }

    return result.chapter3
  }

  public handleChapter4 = async (inputId: mongoose.Types.ObjectId) => {
    const input = await this.Input.findById(inputId)

    if (!input) {
      throw Error('InputId không hợp lệ')
    }

    const chapter1Result = await this.Chapter1.findOne({
      inputId
    }).populate('engineId')

    const chapter2Result = await this.Chapter2.findOne({
      inputId
    })

    const chapter3Result = await this.Chapter3.findOne({
      inputId
    })

    let chapter4Result = await this.Chapter4.findOne({
      inputId
    })
    
    if (!chapter4Result) {
      chapter4Result = new this.Chapter4()
      chapter4Result.inputId = inputId
      chapter4Result.status = 'initial'
      await chapter4Result.save()
    }

    chapter4Result = chapter4Result.toObject()

    const chapter4Handler = new Chapter4Handler(input, chapter1Result, chapter2Result, chapter3Result, chapter4Result)
    const result = chapter4Handler.run()

    await this.Chapter4.updateOne(
      {
        inputId: inputId
      },
      {
        ...result.chapter4
      }
    )

    // console.log(result.chapter4)

    return result.chapter4
  }

  public handleChapter5 = async (inputId: mongoose.Types.ObjectId) => {
    const input = await this.Input.findById(inputId)

    if (!input) {
      throw Error('InputId không hợp lệ')
    }

    const chapter1Result = await this.Chapter1.findOne({
      inputId
    }).populate('engineId')

    const chapter2Result = await this.Chapter2.findOne({
      inputId
    })

    const chapter3Result = await this.Chapter3.findOne({
      inputId
    })

    const chapter4Result = await this.Chapter4.findOne({
      inputId
    })

    let chapter5Result = await this.Chapter5.findOne({
      inputId
    })

    if (!chapter5Result) {
      chapter5Result = new this.Chapter5()
      chapter5Result.inputId = inputId
      chapter5Result.status = 'initial'
      await chapter5Result.save()
    }

    chapter5Result = chapter5Result.toObject()

    const chapter5Handler = new Chapter5Handler(input, chapter1Result, chapter2Result, chapter3Result, chapter4Result)
    const result = chapter5Handler.run()

    await this.Chapter5.updateOne(
      {
        inputId: inputId
      },
      {
        ...result.chapter5
      }
    )

    return result.chapter5
  }

  public handleChapter6 = async (inputId: mongoose.Types.ObjectId) => {
    const input = await this.Input.findById(inputId)

    if (!input) {
      throw Error('InputId không hợp lệ')
    }

    let chapter6 = await this.Chapter6.findOne({
      inputId
    })

    if (!chapter6) {
      const chapter6Handler = new Chapter6Handler()
      const result = chapter6Handler.run()

      chapter6 = await this.Chapter6.create({
        inputId,
        lubricationTable: result
      })
    }

    return chapter6
  }

  public handleChapter7 = async (inputId: mongoose.Types.ObjectId) => {
    const input = await this.Input.findById(inputId)

    if (!input) {
      throw Error('InputId không hợp lệ')
    }

    let chapter7 = await this.Chapter7.findOne({
      inputId
    })

    if (!chapter7) {
      const chapter7Handler = new Chapter7Handler(input)
      const result = chapter7Handler.run()

      chapter7 = await this.Chapter7.create({
        inputId,
        fitData: result
      })
    }

    return chapter7
  }
}
