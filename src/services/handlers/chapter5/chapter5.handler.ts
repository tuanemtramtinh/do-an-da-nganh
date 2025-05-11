import { IChapter1Result } from '~/interfaces/chapter1_result.interface'
import { IChapter2Result } from '~/interfaces/chapter2_result.interface'
import { IInputData } from '~/interfaces/input.interface'
import { Chapter5Section2Handler } from './section2.handler'
import { Chapter5Section1Handler } from './section1.handler'

export class Chapter5Handler {
  private inputData: IInputData
  private chapter1Result: IChapter1Result
  private chapter2Result: IChapter2Result
  private chapter3Result: any
  private chapter4Result: any
  private chapter5Section1Handler: Chapter5Section1Handler
  private chapter5Section2Handler: Chapter5Section2Handler
  private request = ''

  constructor(
    inputData: IInputData,
    chapter1Result: IChapter1Result,
    chapter2Result: IChapter2Result,
    chapter3Result: any,
    chapter4Result: any,
    request: string = ''
  ) {
    this.inputData = inputData
    this.chapter1Result = chapter1Result
    this.chapter2Result = chapter2Result
    this.chapter3Result = chapter3Result
    this.chapter4Result = chapter4Result
    this.request = request
    this.chapter5Section1Handler = new Chapter5Section1Handler()
    this.chapter5Section2Handler = new Chapter5Section2Handler()

    this.chapter5Section1Handler.setNext(this.chapter5Section2Handler)
  }

  public run() {
    return this.chapter5Section1Handler.handle(
      this.inputData,
      {
        chapter1: this.chapter1Result,
        chapter2: this.chapter2Result,
        chapter3: this.chapter3Result,
        chapter4: this.chapter4Result
      },
      this.request
    )
  }
}
