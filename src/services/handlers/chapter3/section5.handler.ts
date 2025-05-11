import { IInputData } from '~/interfaces/input.interface'
import { AbstractHandler } from '../abstract.handler'

export class Chapter3Section5Handler extends AbstractHandler {
  public handle(input: IInputData, result: any, request: string = ''): any | null {
    if (request === 'stage-2') {
      const chapter2 = result.chapter2
      const chapter3 = result.chapter3

      // console.log(chapter3)

      // 5.1
      const dtrucvit = chapter2.sizeOfTranmission.truc_vit.d1 //chuong2

      const Fa1 = chapter2.sizeOfTranmission.Ft2
      const Fr1 = chapter2.sizeOfTranmission.Fr1
      const Ft1 = chapter2.sizeOfTranmission.Ft1
      const Fd = chapter2.beltParamaters.Fr
      const Fa2 = Ft1
      const Fr2 = Fr1
      const Ft2 = Fa1
      const Ft3 = chapter3.Ft3
      const Fr3 = chapter3.Fr3
      const Fnt = chapter3.F_nt

      const Ma1 = (Fa1 * dtrucvit) / 2
      console.log('Ma1:' + Ma1)

      const l11 = chapter3.trucI_l11 //chuong3
      const l13 = chapter3.trucI_l13 //chuong3

      const Rcy = (Fr1 * l13 + Ma1) / l11
      // console.log({
      //   Fr1,
      //   Ma1,
      //   l11,
      //   l13,
      //   Rcy
      // })
      console.log('Rcy:' + Rcy)

      const RAy = Fr1 - Rcy
      console.log('RAy:' + RAy)

      const MBymax = Rcy * l13
      console.log('MBymax:' + MBymax)

      const l12 = chapter3.trucI_l12 //chuong3

      const RAx = (Ft1 * l13 - Fd * (l12 + l11)) / l11
      console.log('RAx:' + RAx)

      const Rcx = Ft1 - (Fd + RAx)
      console.log('Rcx:' + Rcx)

      const MAx = Fd * l12
      console.log('MAx:' + MAx)

      const MBx = Rcx * l13
      console.log('MBx:' + MBx)

      //5.2 truc II

      const dbanhvit = chapter2.sizeOfTranmission.banh_vit.d2 //chuong2

      const Ma2 = (Fa2 * dbanhvit) / 2
      console.log('Ma2:' + Ma2)

      const l22 = chapter3.trucII_l22 //chuong3
      const l21 = chapter3.trucII_l21 //chuong3
      const l23 = chapter3.trucII_l23 //chuong3

      const RDy = (Fr2 * (l23 - l22) - Ma2 + Ft3 * (l23 - l21)) / l23
      console.log('RDy:' + RDy)

      const RGy = Ft3 - RDy + Fr2
      console.log('RGy:' + RGy)

      const RDx = (Ft2 * (l23 - l22) + Fr3 * (l23 - l21)) / l23
      console.log('RDx:' + RDx)

      const RGx = Ft2 - RDx + Fr3
      console.log('RGx:' + RGx)

      // 5.3 truc III
      const Ft4 = Ft3 //chuong3
      const l31 = l23 //chuong3
      const l32 = l21 //chuong3
      // const Fnt = 8400; //chuong3
      const l33 = chapter3.trucIII_l33 //chuong3

      const RMy = (Ft4 * (l31 - l32) + Fnt * (l33 - l31)) / l31
      console.log('RMy:' + RMy)

      const RLy = Fnt + RMy - Ft4
      console.log('RLy:' + RLy)

      const Fr4 = Fr3 //chuong3
      const RMx = (Fr4 * (l31 - l32)) / l31
      console.log('RMx:' + RMx)

      const RLx = Fr4 - RMx
      console.log('RLx:' + RLx)

      return super.handle(
        input,
        {
          ...result,
          chapter3: {
            ...result.chapter3,
            Ma2,
            MBx,
            MBymax,
            RGx,
            RGy,
            RDx,
            RDy,
            RMx,
            RMy,
            Ft4,
            MAx,
            RAx,
            RAy,
            RCy: Rcy,
            RCx: Rcx,
            RLx,
            RLy
          }
        },
        request
      )
    }
    return super.handle(input, result, request)
  }
}
