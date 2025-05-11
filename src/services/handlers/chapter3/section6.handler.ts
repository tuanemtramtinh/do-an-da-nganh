import { IInputData } from '~/interfaces/input.interface'
import { AbstractHandler } from '../abstract.handler'

export class Chapter3Section6Handler extends AbstractHandler {
  public handle(input: IInputData, result: any, request: string = ''): any | null {
    if (request === 'stage-2') {
      const vatlieutruc: string = 'C45' // chuong3
      const sigmab = result.chapter3.ob // chuong3
      const dsb1 = result.chapter3.dsb1 // chuong3
      let sigma: number = 0

      const MBx = result.chapter3.MBx
      const MBymax = result.chapter3.MBymax
      const RGy = result.chapter3.RGy
      const RDx = result.chapter3.RDx
      const RMx = result.chapter3.RMx
      const RMy = result.chapter3.RMy

      const l21 = result.chapter3.trucII_l21
      const l22 = result.chapter3.trucII_l22
      const l23 = result.chapter3.trucII_l23
      const l32 = result.chapter3.trucIII_l32

      const Ft2 = result.chapter2.sizeOfTranmission.Ft2

      const T2 = result.chapter1.T_II
      const T3 = result.chapter1.T_III

      if ((vatlieutruc == 'C45' || vatlieutruc == 'CT6') && sigmab >= 600) {
        if (20 <= dsb1 && dsb1 <= 40) {
          sigma = 63
        } else if (40 <= dsb1 && dsb1 <= 75) {
          sigma = 50
        } else if (75 <= dsb1 && dsb1 <= 100) {
          sigma = 48
        }
      } else if ((vatlieutruc == 'C35' || vatlieutruc == 'CT5') && sigmab >= 500) {
        if (20 <= dsb1 && dsb1 <= 40) {
          sigma = 58
        } else if (40 <= dsb1 && dsb1 <= 75) {
          sigma = 48
        } else if (75 <= dsb1 && dsb1 <= 100) {
          sigma = 45
        }
      } else if (vatlieutruc == 'C45' && sigmab >= 850) {
        if (20 <= dsb1 && dsb1 <= 40) {
          sigma = 67
        } else if (40 <= dsb1 && dsb1 <= 75) {
          sigma = 55
        } else if (75 <= dsb1 && dsb1 <= 100) {
          sigma = 50
        }
      } else if (vatlieutruc == 'CC' && sigmab >= 1000) {
        if (20 <= dsb1 && dsb1 <= 40) {
          sigma = 70
        } else if (40 <= dsb1 && dsb1 <= 75) {
          sigma = 60
        } else if (75 <= dsb1 && dsb1 <= 100) {
          sigma = 55
        }
      }

      console.log('sigma:' + sigma)

      //truc I
      const T1 = result.chapter1.T_I //chuong3
      const Mtd1 = Math.sqrt(MBx * MBx + MBymax * MBymax + 0.75 * T1 * T1)
      console.log(MBx, MBymax)
      console.log('Mtd1:' + Mtd1)

      const d1 = Math.cbrt(Mtd1 / (0.1 * sigma))
      console.log('d1:' + d1)

      //truc II
      const MFx = RGy * (l23 - l21)
      console.log('MFx:' + MFx)
      const MFy = RDx * l22 + -(Ft2 - RDx) * (l21 - l22)
      console.log('MFy:' + MFy)
      const Mtd2 = Math.sqrt(MFx * MFx + MFy * MFy + 0.75 * T2 * T2)
      console.log('Mtd2:' + Mtd2)

      const d2 = Math.cbrt(Mtd2 / (0.1 * sigma))
      console.log('d2:' + d2)

      const standardDiameters: number[] = [15, 17, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100]

      function roundToStandardDiameter(x: number, roundUp: boolean = true): number {
        if (roundUp) {
          const found = standardDiameters.find((d) => d >= x)
          return found !== undefined ? found : standardDiameters[standardDiameters.length - 1]
        } else {
          const found = [...standardDiameters].reverse().find((d) => d <= x)
          return found !== undefined ? found : standardDiameters[0]
        }
      }
      const dIItren = 1.02 * d2
      const dIIduoi = 1.1 * d2
      const dII = roundToStandardDiameter((dIItren + dIIduoi) / 2, false)
      console.log('dII:' + dII)

      //truc III
      const MNx = Math.ceil(l32 * RMy)
      console.log('MNx:' + MNx)
      const MNy = l32 * RMx
      const Mtd3 = Math.sqrt(MNx * MNx + MNy * MNy + 0.75 * T3 * T3)

      // console.log({
      //   l32,
      //   RMy
      // })

      console.log('Mtd3:' + Mtd3)

      const d3 = Math.cbrt(Mtd3 / (0.1 * sigma))
      console.log('d3:' + d3)

      const dIIItren = 1.05 * d3
      const dIIIduoi = 1.1 * d3
      const dIII = roundToStandardDiameter((dIIItren + dIIIduoi) / 2, false)
      console.log('dIII:' + dIII)

      return super.handle(
        input,
        {
          ...result,
          chapter3: {
            ...result.chapter3,
            Mtd1,
            Mtd2,
            Mtd3,
            MFx,
            MFy,
            MNx,
            MNy
          }
        },
        request
      )
    }

    return super.handle(input, result, request)
  }
}
