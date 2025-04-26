import { IInputData } from '~/interfaces/input.interface'
import { AbstractHandler } from '../abstract.handler'

export class Chapter3Section8Handler extends AbstractHandler {
  public handle(input: IInputData, result: any, request: string = ''): any | null {
    if (request === 'stage-2') {
      const chapter1 = result.chapter1

      const T_I = chapter1.T_I
      const T_II = chapter1.T_II
      const T_III = chapter1.T_III

      const muy = 63
      const chapter3 = result.chapter3

      const Ma2 = chapter3.Ma2
      const RDy = chapter3.RDy
      const RDx = chapter3.RDx
      const RMy = chapter3.RMy
      const Ft4 = chapter3.Ft4
      const l22 = chapter3.trucII_l22
      const l32 = chapter3.trucIII_l32
      const l31 = chapter3.trucIII_l31

      const MAx = chapter3.MAx
      const MAy = 0
      const MBx = chapter3.MBx
      const MBy = chapter3.MBymax

      const MFx = chapter3.MFx
      const MFy = chapter3.MFy

      const MNx = chapter3.MNx
      const MNy = chapter3.MNy

      // const Mtd1 = chapter3.Mtd1
      // const Mtd2 = chapter3.Mtd2
      // const Mtd3 = chapter3.Mtd3

      //TRỤC I
      const MtdDai: number = (0.75 * T_I ** 2) ** (1 / 2)
      const MtdA: number = (MAx ** 2 + MAy ** 2 + 0.75 * T_I ** 2) ** (1 / 2)
      const MtdB: number = (MBx ** 2 + MBy ** 2 + 0.75 * T_I ** 2) ** (1 / 2)
      const MtdC: number = 0

      const dA = (MtdA / (0.1 * muy)) ** (1 / 3)
      const dB = (MtdB / (0.1 * muy)) ** (1 / 3)
      const dC = (MtdC / (0.1 * muy)) ** (1 / 3)
      const dAInc = dA * 1.11
      const dBInc = dB * 1.11
      const dCInc = dC * 1.11

      // console.log(MtdDai, MtdA, MtdB, MtdC)

      //TRỤC II
      const MtdD: number = 0
      const MEx: number = RDy * l22 + Ma2
      const MEy: number = RDx * l22
      const MtdE: number = (MEx ** 2 + MEy ** 2 + 0.75 * T_II ** 2) ** (1 / 2)
      const MtdF: number = (MFx ** 2 + MFy ** 2 + 0.75 * T_II ** 2) ** (1 / 2)
      const MtdG: number = 0

      const dD = (MtdD / (0.1 * muy)) ** (1 / 3)
      const dE = (MtdE / (0.1 * muy)) ** (1 / 3)
      const dF = (MtdF / (0.1 * muy)) ** (1 / 3)
      const dG = (MtdG / (0.1 * muy)) ** (1 / 3)
      const dDInc = dD * 1.11
      const dEInc = dE * 1.11
      const dFInc = dF * 1.11
      const dGInc = dG * 1.11

      // console.log(MtdD, MtdE, MtdF, MtdG)

      //TRỤC III
      const MtdM: number = 0
      const MtdN: number = (MNx ** 2 + MNy ** 2 + 0.75 * T_III ** 2) ** (1 / 2)
      const MLx: number = RMy * l32 - (Ft4 - RMy) * l31
      // console.log(MLx);
      const MtdL: number = (MLx ** 2 + 0.75 * T_III ** 2) ** (1 / 2)
      const MtdK: number = (0.75 * T_III ** 2) ** (1 / 2)

      const dM = (MtdM / (0.1 * muy)) ** (1 / 3)
      const dN = (MtdN / (0.1 * muy)) ** (1 / 3)
      const dL = (MtdL / (0.1 * muy)) ** (1 / 3)
      const dK = (MtdK / (0.1 * muy)) ** (1 / 3)
      const dMInc = dM * 1.11
      const dNInc = dN * 1.11
      const dLInc = dL * 1.11
      const dKInc = dK * 1.11

      // console.log(MLx)
      // console.log(MtdM, MtdN, MtdL, MtdK)

      return super.handle(
        input,
        {
          ...result,
          chapter3: {
            ...result.chapter3,
            muy,
            MtdA,
            dA,
            dAInc,
            MtdB,
            dB,
            dBInc,
            MtdC,
            dC,
            dCInc,
            MtdD,
            dD,
            dDInc,
            MtdE,
            dE,
            dEInc,
            MtdF,
            dF,
            dFInc,
            MtdG,
            dG,
            dGInc,
            MtdM,
            dM,
            dMInc,
            MtdN,
            dN,
            dNInc,
            MtdL,
            dL,
            dLInc,
            MtdK,
            dK,
            dKInc
          }
        },
        request
      )
    }

    return super.handle(input, result, request)
  }
}
