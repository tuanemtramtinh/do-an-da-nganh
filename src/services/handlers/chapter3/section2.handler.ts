import { IInputData } from '~/interfaces/input.interface'
import { AbstractHandler } from '../abstract.handler'

export class Chapter3Section2Handler extends AbstractHandler {
  public handle(input: IInputData, result: any, request: string = ''): any | null {
    if (request === 'initial') {
      const duongKinhTruc = (T: number, t: number): number => {
        const d = Math.pow(T / (0.2 * t), 1 / 3)
        return d
      }

      const bang_d: number[] = [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 100]

      const lamTronDuongKinhTheoBang10_2 = (dsb: number): number => {
        for (let i = 0; i < bang_d.length; i++) {
          if (dsb <= bang_d[i]) {
            return bang_d[i]
          }
        }
        // Nếu vượt quá bảng, trả về giá trị cuối cùng
        return bang_d[bang_d.length - 1]
      }

      const duongKinhTruc_dsb1_raw = duongKinhTruc(result.chapter1.T_I, result.chapter3.ungSuatXoanChoPhep_t)

      const duongKinhTruc_dsb1 = lamTronDuongKinhTheoBang10_2(duongKinhTruc_dsb1_raw)

      const duongKinhTruc_dsb2_raw = duongKinhTruc(result.chapter1.T_II, result.chapter3.ungSuatXoanChoPhep_t)

      const duongKinhTruc_dsb2 = lamTronDuongKinhTheoBang10_2(duongKinhTruc_dsb2_raw)

      const duongKinhTruc_dsb3_raw = duongKinhTruc(result.chapter1.T_III, result.chapter3.ungSuatXoanChoPhep_t)

      const duongKinhTruc_dsb3 = lamTronDuongKinhTheoBang10_2(duongKinhTruc_dsb3_raw)

      const min_lm12 = 1.2 * duongKinhTruc_dsb1
      const max_lm12 = 1.5 * duongKinhTruc_dsb1
      const min_lm22 = 1.2 * duongKinhTruc_dsb2
      const max_lm22 = 1.8 * duongKinhTruc_dsb2
      const min_lm23 = 1.2 * duongKinhTruc_dsb3
      const max_lm23 = 1.5 * duongKinhTruc_dsb3
      const min_lm34 = 1.2 * duongKinhTruc_dsb3
      const max_lm34 = 1.5 * duongKinhTruc_dsb3

      return {
        ...result,
        chapter3: {
          ...result.chapter3,
          dsb1: duongKinhTruc_dsb1,
          dsb2: duongKinhTruc_dsb2,
          dsb3: duongKinhTruc_dsb3
        }
      }
    }

    return super.handle(
      input,
      {
        ...result
      },
      request
    )
  }
}
