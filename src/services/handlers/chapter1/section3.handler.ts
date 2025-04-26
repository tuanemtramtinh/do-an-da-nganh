import { IInputData } from '~/interfaces/input.interface'
import { AbstractHandler } from '../abstract.handler'

export class Chapter1Section3Handler extends AbstractHandler {
  public async handle(input: IInputData, result: any, request: string = ''): Promise<any | null> {
    if (request === 'stage-1') {
      const chapter1 = result.chapter1

      // 3. Xác định các thông số động học và lực của các trục

      // 3.1. Tính toán tốc độ quay trên các trục
      const n_dc = chapter1.engineId.van_toc_quay_vgph //Trục động cơ
      const n_1 = n_dc / chapter1.u_dc //Trục I
      const n_2 = n_1 / chapter1.u_I_II //Trục II
      const n_3 = n_2 / chapter1.u_II_III //Trục III

      // 3.2. Tính công suất trên các trục
      const P_3 = chapter1.P_td / (chapter1.n_kn * chapter1.n_ol) //Công suất danh nghĩa trên trục III
      const P_2 = P_3 / (chapter1.n_brt * chapter1.n_ol) //Công suất danh nghĩa trên trục II
      const P_1 = P_2 / (chapter1.n_tv * chapter1.n_ol) //Công suất danh nghĩa trên trục I
      const P_dc = P_1 / (chapter1.n_d * chapter1.n_ol) //Công suất danh nghĩa trên trục động cơ

      // 3.3.Tính momen xoắn trên các trục
      const T_1 = 9.55 * 10 ** 6 * (P_1 / n_1)
      const T_2 = 9.55 * 10 ** 6 * (P_2 / n_2)
      const T_3 = 9.55 * 10 ** 6 * (P_3 / n_3)
      const T_dc = 9.55 * 10 ** 6 * (P_dc / n_dc)
      return super.handle(
        input,
        {
          chapter1: {
            ...result.chapter1,
            n_dc,
            n_I: n_1,
            n_II: n_2,
            n_III: n_3,
            P_III: P_3,
            P_II: P_2,
            P_I: P_1,
            P_dc,
            T_I: T_1,
            T_II: T_2,
            T_III: T_3,
            T_dc
          }
        },
        request
      )
    }
    return super.handle(input, result, request)
  }
}
