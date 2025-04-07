import { IInputData } from '~/interfaces/input.interface'
import { IChapter1Result } from '~/interfaces/chapter1_result.interface'
import { Chapter2Section1Handler } from './section1.handler'
import { Chapter2Section2Handler } from './section2.handler'
import { Chapter2Section3Handler } from './section3.handler'

export class Chapter2Handler {
  private inputData: IInputData
  private chapter1Result: IChapter1Result
  private chapter2Section1Handler: Chapter2Section1Handler
  private chapter2Section2Handler: Chapter2Section2Handler
  private chapter2Section3Handler: Chapter2Section3Handler

  constructor(inputData: IInputData, chapter1Result: IChapter1Result) {
    this.inputData = inputData
    this.chapter1Result = chapter1Result
    this.chapter2Section1Handler = new Chapter2Section1Handler()
    this.chapter2Section2Handler = new Chapter2Section2Handler()
    this.chapter2Section3Handler = new Chapter2Section3Handler()
    this.chapter2Section1Handler.setNext(this.chapter2Section2Handler).setNext(this.chapter2Section3Handler)
  }

  public run = () => {
    return this.chapter2Section1Handler.handle(this.inputData, { chapter1: this.chapter1Result })
  }
}
