import { IInputData } from '~/interfaces/input.interface'
import { AbstractHandler } from '../abstract.handler'

export class Chapter3Section1Handler extends AbstractHandler {
  public handle(input: IInputData, result: any, request: string = ''): any | null {
    if (request === 'initial') {
      const vatLieuTruc: string = 'thep_C45'
      const ungSuatXoanChoPhep_t: number = 20
      const o1: number = 260
      const ob: number = 600
      const t1: number = 150

      return super.handle(
        input,
        {
          ...result,
          chapter3: {
            ...result.chapter3,
            vatLieuTruc,
            ungSuatXoanChoPhep_t,
            o1,
            ob,
            t1
          }
        },
        request
      )
    }

    return super.handle(input, result, request)
  }
}
