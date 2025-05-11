import { AbstractHandler } from '../abstract.handler'

export class Chapter4Section3Handler extends AbstractHandler {
  public handle(input: any, result: any, request: string = ''): any | null {
    const chapter1 = result.chapter1
    const chapter2 = result.chapter2
    const chapter3 = result.chapter3

    const n3 = chapter1.n_III //chuong 1
    const n = n3

    const LH = 4000

    const RMx_ = chapter3.RMx //chuong 3
    const RMy_ = chapter3.RMy //chuong 3

    // console.log(RMx_, RMy_)

    const FMr = Math.sqrt(RMx_ * RMx_ + RMy_ * RMy_)
    console.log('FMr = ' + FMr)

    const RLx_ = chapter3.RLx //chuong 3
    const RLy_ = chapter3.RLy // chuong 3

    // console.log(RLx_, RLy_)

    const FLr = Math.sqrt(RLx_ * RLx_ + RLy_ * RLy_)
    console.log('FLr = ' + FLr)

    const Fa = 0

    const d_ = 95 //chuong 3 do trong ets seo la I64

    const X = 1
    const Y = 0

    const Kd_ = 1.2
    const Kt = 1
    const V = 1

    const Q = X * V * FMr * Kd_ * Kt
    console.log('Q = ' + Q)

    const L = (60 * n * LH) / 10 ** 6
    console.log('L = ' + L)

    const m = 10 / 3
    const Ctt = Q * L ** (1 / m)
    console.log('Ctt = ' + Ctt)

    const C = 85300
    const L_ = (C / Q) ** m
    console.log('L_ = ' + L_)

    const Lh = (10 ** 6 * L_) / (60 * n)
    console.log('Lh = ' + Lh)

    const table: (string | number)[][] = [
      ['Kí hiệu', 'd', 'D', 'B', 'r', 'Đường kính bi', 'C', 'C₀'],
      [1, 2, 3, 4, 5, 6, 7, 8],
      [219, 95, 170, 32, 3.5, 23.81, 85.3, 70.0]
    ]

    const code = 219
    const d = 95
    const D = 170
    const B = 32
    const r = 3.5
    const ballDiameter = 23.81
    const C_219 = 85.3
    const C0 = 70.0

    return super.handle(
      input,
      {
        ...result,
        chapter4: {
          ...result.chapter4,
          trucIII: {
            code,
            d,
            D,
            B,
            r,
            ballDiameter,
            C: C_219,
            C0
          }
        }
      },
      request
    )
  }
}
