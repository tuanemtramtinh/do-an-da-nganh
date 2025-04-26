import { IInputData } from '~/interfaces/input.interface'
import { AbstractHandler } from '../abstract.handler'
import { solveQuartic } from '@littlefattie/solve-equations'

const c: number = 2 //góc nghiêng của răng trục vít
const tany: number = 0.2
const u_d: number = 3 //Tỷ số truyền của bộ truyền đai thang

export class Chapter1Section2Handler extends AbstractHandler {
  // 2. Phân phối tỷ số truyền
  //Tính toán u trục vít
  public calculateUtv = (u_h: number) => {
    const firstNumber = c ** 3 * tany ** 3
    const secondNumber = 3 * c ** 3 * tany ** 2
    const thirdNumber = 3 * c ** 3 * tany
    const fourthNumber = c ** 3 - tany ** 2 * u_h ** 2
    const fifthNumber = -(tany ** 2 * u_h ** 3)
    const result = solveQuartic(firstNumber, secondNumber, thirdNumber, fourthNumber, fifthNumber)
    const finalResult = result.find((item) => item.re >= 0 && item.im === 0)
    return finalResult.re //Trả về phần thực
  }

  public async handle(input: IInputData, result: any, request: string = ''): Promise<any | null> {
    if (request === 'stage-1') {
      const chapter1 = result.chapter1
      const u_t = chapter1.engineId.van_toc_quay_vgph / chapter1.n_lv //tỷ số truyền ut của hệ dẫn động
      const u_h = u_t / u_d //tỷ số truyền hộp giảm tốc
      const u_tv = this.calculateUtv(u_h) //tính u_tv
      const u_brt = u_h / u_tv //tỷ số truyền của bánh răng trụ thẳng
      const u_kt = u_tv * u_brt * u_d
      return super.handle(
        input,
        {
          chapter1: {
            ...result.chapter1,
            u_dc: u_d,
            u_I_II: u_tv,
            u_II_III: u_brt
          }
        },
        request
      )
    }
    return super.handle(input, result, request)
  }
}
