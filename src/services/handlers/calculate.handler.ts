import { IInputData } from '~/interfaces/input.interface'
import { Chapter1Handler } from './chapter1.handler'
import { AbstractHandler } from './abstract.handler'
import { Chapter2Handler } from './chapter2.handler'

export class CalculateHandler {
  private inputData: IInputData
  private chapter1Handler: Chapter1Handler
  private chapter2Handler: Chapter2Handler

  constructor(inputData: IInputData) {
    this.inputData = inputData
    this.chapter1Handler = new Chapter1Handler()
    this.chapter2Handler = new Chapter2Handler()
    this.chapter1Handler.setNext(this.chapter2Handler)
  }

  public run = async () => {
    return await this.chapter1Handler.handle(this.inputData, {})
    // return 'hell'
  }
}
