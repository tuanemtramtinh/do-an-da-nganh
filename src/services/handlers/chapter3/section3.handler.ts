import { IInputData } from '~/interfaces/input.interface'
import { AbstractHandler } from '../abstract.handler'

export class Chapter3Section3Handler extends AbstractHandler {
  public handle(input: IInputData, result: any, request: string = ''): any | null {
    console.log(result)
    const bang_b = [15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 47]
    const bang_d: number[] = [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 100]

    const timBo = (dsb: number): number => {
      for (let i = 0; i < bang_d.length; i++) {
        if (dsb <= bang_d[i]) {
          return bang_b[i]
        }
      }
      // Nếu lớn hơn hết thì trả về giá trị cuối
      return bang_b[bang_b.length - 1]
    }

    const chieuRongOLan_bo1 = timBo(result.chapter3.dsb1)
    const chieuRongOLan_bo2 = timBo(result.chapter3.dsb2)
    const chieuRongOLan_bo3 = timBo(result.chapter3.dsb3)

    const tinhBanhDai = (d: number): number => {
      const min = Math.ceil(1.2 * d)
      const max = Math.floor(1.5 * d)
      return Math.floor(Math.random() * (max - min + 1)) + min
    }

    const tinhBanhVit = (d: number): number => {
      const min = Math.ceil(1.2 * d)
      const max = Math.floor(1.8 * d)
      return Math.floor(Math.random() * (max - min + 1)) + min
    }

    // const banhdai_Lm12 = tinhBanhDai(result.chapter3.dsb1)
    // const banhvit_Lm22 = tinhBanhDai(result.chapter3.dsb2)
    // const banhRangTru_Lm23 = tinhBanhDai(result.chapter3.dsb3)
    // const banhRangTru_Lm34 = tinhBanhDai(result.chapter3.dsb3)

    const banhdai_Lm12 = result.chapter3.lm12
    const banhvit_Lm22 = result.chapter3.lm22
    const banhRangTru_Lm23 = result.chapter3.lm23
    const banhRangTru_Lm34 = result.chapter3.lm34

    // console.log(object)

    const tinhChieuDaiMayorNuaKhopNoi = (d: number): number => {
      const min = Math.ceil(1.4 * d)
      const max = Math.floor(2.5 * d)
      let result = 0

      do {
        result = Math.floor(Math.random() * (max - min + 1)) + min
      } while (result <= 162)

      return result
    }

    // const chieuDaiMayorNuaKhopNoi_Lm33 = tinhChieuDaiMayorNuaKhopNoi(result.chapter3.dsb3)
    const chieuDaiMayorNuaKhopNoi_Lm33 = result.chapter3.lm33

    const k1 = 10
    const k2 = 12
    const k3 = 15
    const hn = 17

    const tinhTruc1_L12 = (lm12: number, bo1: number, k3: number, hn: number): number => {
      const l12 = 0.5 * (lm12 + bo1) + k3 + hn
      return l12
    }

    const trucI_l12 = parseFloat(tinhTruc1_L12(banhdai_Lm12, chieuRongOLan_bo1, k3, hn).toFixed(1))

    const daM2: number = result.chapter2.sizeOfTranmission.banh_vit.daM2
    const tinhTruc1_L11 = (daM2: number): number => {
      const min = Math.ceil(daM2 * 0.9)
      const max = daM2 * 1
      const l11 = Math.floor(Math.random() * (max - min + 1)) + min
      return l11
    }

    // const trucI_l11 = tinhTruc1_L11(daM2)
    const trucI_l11 = 360

    const trucI_l13 = trucI_l11 / 2

    //random theo Lm22
    const trucII_l22 = tinhTruc1_L12(banhvit_Lm22, chieuRongOLan_bo2, k1, k2)

    //random theo Lm22
    const trucII_l21 = tinhTruc1_L12(banhvit_Lm22, banhRangTru_Lm23, k1, trucII_l22)

    const trucII_l23 = trucII_l21 + tinhTruc1_L12(banhRangTru_Lm23, chieuRongOLan_bo2, k1, k2)

    const trucIII_l32 = trucII_l21

    const trucIII_l31 = trucII_l23

    const trucIII_lc33 = hn + k3 + chieuDaiMayorNuaKhopNoi_Lm33

    const trucIII_l33 = trucIII_l31 + trucIII_lc33
    // 3. Hết Chọn kích thước dọc trục

    return super.handle(input, {
      ...result,
      chapter3: {
        ...result.chapter3,
        trucI_l11,
        trucI_l12,
        trucI_l13,
        trucII_l21,
        trucII_l22,
        trucII_l23,
        trucIII_l31,
        trucIII_l32,
        trucIII_l33
      },
      request
    })

    // return super.handle(
    //   input,
    //   {
    //     ...result,
    //     chapter3: {
    //       // dsb1: duongKinhTruc_dsb1,
    //       // dsb2: duongKinhTruc_dsb2,
    //       // dsb3: duongKinhTruc_dsb3
    //     }
    //   },
    //   request
    // )
  }
}
