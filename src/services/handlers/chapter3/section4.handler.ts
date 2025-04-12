import { IInputData } from '~/interfaces/input.interface'
import { AbstractHandler } from '../abstract.handler'

export class Chapter3Section4Handler extends AbstractHandler {
  public handle(input: IInputData, result: any, request: string = ''): any | null {
    const Fr = result.chapter2.beltParamaters.Fr //chuong2 phan 1
    const Fd = Fr

    const Fa1 = result.chapter2.sizeOfTranmission.Ft2 //chuong2 phan 2 tuong duong ft2
    const Ft2 = Fa1 //chuong2

    const Fr1 = result.chapter2.sizeOfTranmission.Fr1 //chuong2 phan 2
    const Fr2 = Fr1 //chuong2

    const Ft1 = result.chapter2.sizeOfTranmission.Ft1 //chuong2
    const Fa2 = Ft1 //chuong2 phan 2 tuong duoong ft1

    const dw1 = result.chapter2.gearSpecification.dw1 //chuong2
    const T2 = result.chapter1.T_II //chuong1
    const T3 = T2
    const Ft3 = (2 * T3) / dw1
    console.log('Ft3 ' + Ft3)

    const Fr3 = Ft3 * Math.tan((20 * Math.PI) / 180)
    console.log('Fr3: ' + Fr3)

    const T3_c1 = result.chapter1.T_III //chuong1
    const T4 = T3_c1 //chuong1
    const D0 = 300 //chuong3
    const Dt = D0
    const standardForces = [6300, 7000, 7500, 8000, 8300, 8400, 8500, 8600, 8700, 9000]

    const Fnt_truoc = 0.2 * (T4 / (0.5 * Dt))
    console.log('Fnt_truoc: ' + Fnt_truoc)

    const Fnt_sau = 0.3 * (T4 / (0.5 * Dt))
    console.log('Fnt_sau: ' + Fnt_sau)

    const Fnt = [...standardForces].reverse().find((force) => force <= Fnt_sau) || standardForces[0]

    console.log('Fnt: ', Fnt)

    return 'hihi'
  }
}
