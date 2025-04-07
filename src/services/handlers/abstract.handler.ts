import { IInputData } from '~/interfaces/input.interface'

interface Handler {
  setNext(handler: Handler): Handler
  handle(input: IInputData, result: object): object | null
}

export abstract class AbstractHandler implements Handler {
  private nextHandler: Handler | null = null

  public setNext = (handler: Handler): Handler => {
    this.nextHandler = handler
    return handler
  }

  public handle(input: IInputData, result: any): any | null {
    if (!this.nextHandler) return result
    return this.nextHandler.handle(input, result)
  }
}
