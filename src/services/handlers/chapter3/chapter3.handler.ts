import { IChapter1Result } from '~/interfaces/chapter1_result.interface'
import { IInputData } from '~/interfaces/input.interface'
import { Chapter3Section1Handler } from './section1.handler'
import { IChapter2Result } from '~/interfaces/chapter2_result.interface'
import { Chapter3Section2Handler } from './section2.handler'
import { Chapter3Section3Handler } from './section3.handler'
import { Chapter3Section4Handler } from './section4.handler'
import { Chapter3Section5Handler } from './section5.handler'
import { Chapter3Section6Handler } from './section6.handler';
import { Chapter3Section7Handler } from './section7.handler'
import { Chapter3Section8Handler } from './section8.handler'

export class Chapter3Handler {
  private inputData: IInputData
  private chapter1Result: IChapter1Result
  private chapter2Result: IChapter2Result
  private chapter3Result: any
  private chapter3Section1Handler: Chapter3Section1Handler
  private chapter3Section2Handler: Chapter3Section2Handler
  private chapter3Section3Handler: Chapter3Section3Handler
  private chapter3Section4Handler: Chapter3Section4Handler
  private chapter3Section5Handler: Chapter3Section5Handler
  private chapter3Section6Handler: Chapter3Section6Handler
  private chapter3Section7Handler: Chapter3Section7Handler
  private chapter3Section8Handler: Chapter3Section8Handler
  private request: string

  constructor(
    input: IInputData,
    chapter1Result: IChapter1Result,
    chapter2Result: IChapter2Result,
    chapter3Result: any,
    request: string
  ) {
    this.inputData = input
    this.chapter1Result = chapter1Result
    this.chapter2Result = chapter2Result
    this.chapter3Result = chapter3Result
    this.chapter3Section1Handler = new Chapter3Section1Handler()
    this.chapter3Section2Handler = new Chapter3Section2Handler()
    this.chapter3Section3Handler = new Chapter3Section3Handler()
    this.chapter3Section4Handler = new Chapter3Section4Handler()
    this.chapter3Section5Handler = new Chapter3Section5Handler()
    this.chapter3Section6Handler = new Chapter3Section6Handler()
    this.chapter3Section7Handler = new Chapter3Section7Handler()
    this.chapter3Section8Handler = new Chapter3Section8Handler()

    this.request = request

    this.chapter3Section1Handler
      .setNext(this.chapter3Section2Handler)
      .setNext(this.chapter3Section3Handler)
      .setNext(this.chapter3Section4Handler)
      .setNext(this.chapter3Section5Handler)
      .setNext(this.chapter3Section6Handler)
      .setNext(this.chapter3Section7Handler)
      .setNext(this.chapter3Section8Handler)
  }

  public run() {
    return this.chapter3Section1Handler.handle(
      this.inputData,
      {
        chapter1: this.chapter1Result,
        chapter2: this.chapter2Result,
        chapter3: this.chapter3Result
      },
      this.request
    )
  }
}
