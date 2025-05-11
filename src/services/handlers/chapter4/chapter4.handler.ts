import { IInputData } from '~/interfaces/input.interface'
import { Chapter4Section1Handler } from './section1.handler'
import { IChapter2Result } from '~/interfaces/chapter2_result.interface'
import { IChapter1Result } from '~/interfaces/chapter1_result.interface'
import { Chapter4Section3Handler } from './section3.handler'
import { Chapter4Section2Handler } from './section2.handler'
export class Chapter4Handler {
  private inputData: IInputData
  private chapter1Result: IChapter1Result
  private chapter2Result: IChapter2Result
  private chapter3Result
  private chapter4Result: any
  private chapter4Section1Handler: Chapter4Section1Handler
  private chapter4Section2Handler: Chapter4Section2Handler
  private chapter4Section3Handler: any
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
    this.chapter4Section1Handler = new Chapter4Section1Handler()
    this.chapter4Section2Handler = new Chapter4Section2Handler()
    this.chapter4Section3Handler = new Chapter4Section3Handler()
    this.chapter4Section1Handler.setNext(this.chapter4Section2Handler).setNext(this.chapter4Section3Handler)
  }

  public run() {
    return this.chapter4Section1Handler.handle(
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
