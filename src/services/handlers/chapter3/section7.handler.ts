import { IInputData } from '~/interfaces/input.interface'
import { AbstractHandler } from '../abstract.handler'

export class Chapter3Section7Handler extends AbstractHandler {
  public handle(input: IInputData, result: any, request: string = ''): any | null {
    const findingBHT1OfB = (dsb1: number) => {
      let bB, hB, t1B

      if (6 <= dsb1 && dsb1 <= 8) {
        bB = 2
        hB = 2
        t1B = 1.2
      } else if (8 < dsb1 && dsb1 <= 10) {
        bB = 3
        hB = 3
        t1B = 1.8
      } else if (10 < dsb1 && dsb1 <= 12) {
        bB = 4
        hB = 4
        t1B = 2.5
      } else if (12 < dsb1 && dsb1 <= 17) {
        bB = 5
        hB = 5
        t1B = 3
      } else if (17 < dsb1 && dsb1 <= 22) {
        bB = 6
        hB = 6
        t1B = 3.5
      } else if (22 < dsb1 && dsb1 <= 30) {
        bB = 8
        hB = 7
        t1B = 4
      } else if (30 < dsb1 && dsb1 <= 38) {
        bB = 10
        hB = 8
        t1B = 5
      } else if (38 < dsb1 && dsb1 <= 44) {
        bB = 12
        hB = 8
        t1B = 5
      } else if (44 < dsb1 && dsb1 <= 50) {
        bB = 14
        hB = 9
        t1B = 5.5
      } else if (50 < dsb1 && dsb1 <= 58) {
        bB = 16
        hB = 10
        t1B = 6
      } else if (58 < dsb1 && dsb1 <= 65) {
        bB = 18
        hB = 11
        t1B = 7
      } else if (65 < dsb1 && dsb1 <= 75) {
        bB = 20
        hB = 12
        t1B = 7.5
      } else if (75 < dsb1 && dsb1 <= 85) {
        bB = 22
        hB = 14
        t1B = 9
      } else if (85 < dsb1 && dsb1 <= 95) {
        bB = 25
        hB = 14
        t1B = 9
      } else if (95 < dsb1 && dsb1 <= 110) {
        bB = 28
        hB = 16
        t1B = 10
      } else if (110 < dsb1 && dsb1 <= 130) {
        bB = 32
        hB = 18
        t1B = 11
      } else if (130 < dsb1 && dsb1 <= 150) {
        bB = 36
        hB = 20
        t1B = 12
      } else if (150 < dsb1 && dsb1 <= 170) {
        bB = 40
        hB = 22
        t1B = 13
      } else if (170 < dsb1 && dsb1 <= 200) {
        bB = 45
        hB = 25
        t1B = 15
      } else if (200 < dsb1 && dsb1 <= 230) {
        bB = 50
        hB = 28
        t1B = 17
      } else if (230 < dsb1 && dsb1 <= 260) {
        bB = 56
        hB = 32
        t1B = 20
      } else if (260 < dsb1 && dsb1 <= 290) {
        bB = 63
        hB = 32
        t1B = 20
      } else if (290 < dsb1 && dsb1 <= 330) {
        bB = 70
        hB = 36
        t1B = 22
      } else if (330 < dsb1 && dsb1 <= 380) {
        bB = 80
        hB = 40
        t1B = 25
      } else if (380 < dsb1 && dsb1 <= 440) {
        bB = 90
        hB = 45
        t1B = 28
      } else if (440 < dsb1 && dsb1 <= 500) {
        bB = 100
        hB = 50
        t1B = 31
      } else {
        return null
      }
      return { bB, hB, t1B }
    }

    const findingBHT1OfF = (dsb2: number) => {
      let bF, hF, t1F

      if (6 <= dsb2 && dsb2 <= 8) {
        bF = 2
        hF = 2
        t1F = 1.2
      } else if (8 < dsb2 && dsb2 <= 10) {
        bF = 3
        hF = 3
        t1F = 1.8
      } else if (10 < dsb2 && dsb2 <= 12) {
        bF = 4
        hF = 4
        t1F = 2.5
      } else if (12 < dsb2 && dsb2 <= 17) {
        bF = 5
        hF = 5
        t1F = 3
      } else if (17 < dsb2 && dsb2 <= 22) {
        bF = 6
        hF = 6
        t1F = 3.5
      } else if (22 < dsb2 && dsb2 <= 30) {
        bF = 8
        hF = 7
        t1F = 4
      } else if (30 < dsb2 && dsb2 <= 38) {
        bF = 10
        hF = 8
        t1F = 5
      } else if (38 < dsb2 && dsb2 <= 44) {
        bF = 12
        hF = 8
        t1F = 5
      } else if (44 < dsb2 && dsb2 <= 50) {
        bF = 14
        hF = 9
        t1F = 5.5
      } else if (50 < dsb2 && dsb2 <= 58) {
        bF = 16
        hF = 10
        t1F = 6
      } else if (58 < dsb2 && dsb2 <= 65) {
        bF = 18
        hF = 11
        t1F = 7
      } else if (65 < dsb2 && dsb2 <= 75) {
        bF = 20
        hF = 12
        t1F = 7.5
      } else if (75 < dsb2 && dsb2 <= 85) {
        bF = 22
        hF = 14
        t1F = 9
      } else if (85 < dsb2 && dsb2 <= 95) {
        bF = 25
        hF = 14
        t1F = 9
      } else if (95 < dsb2 && dsb2 <= 110) {
        bF = 28
        hF = 16
        t1F = 10
      } else if (110 < dsb2 && dsb2 <= 130) {
        bF = 32
        hF = 18
        t1F = 11
      } else if (130 < dsb2 && dsb2 <= 150) {
        bF = 36
        hF = 20
        t1F = 12
      } else if (150 < dsb2 && dsb2 <= 170) {
        bF = 40
        hF = 22
        t1F = 13
      } else if (170 < dsb2 && dsb2 <= 200) {
        bF = 45
        hF = 25
        t1F = 15
      } else if (200 < dsb2 && dsb2 <= 230) {
        bF = 50
        hF = 28
        t1F = 17
      } else if (230 < dsb2 && dsb2 <= 260) {
        bF = 56
        hF = 32
        t1F = 20
      } else if (260 < dsb2 && dsb2 <= 290) {
        bF = 63
        hF = 32
        t1F = 20
      } else if (290 < dsb2 && dsb2 <= 330) {
        bF = 70
        hF = 36
        t1F = 22
      } else if (330 < dsb2 && dsb2 <= 380) {
        bF = 80
        hF = 40
        t1F = 25
      } else if (380 < dsb2 && dsb2 <= 440) {
        bF = 90
        hF = 45
        t1F = 28
      } else if (440 < dsb2 && dsb2 <= 500) {
        bF = 100
        hF = 50
        t1F = 31
      } else {
        return null
      }

      return { bF, hF, t1F }
    }

    const findingBHT1OfN = (dsb3: number) => {
      let bN, hN, t1N

      if (6 <= dsb3 && dsb3 <= 8) {
        bN = 2
        hN = 2
        t1N = 1.2
      } else if (8 < dsb3 && dsb3 <= 10) {
        bN = 3
        hN = 3
        t1N = 1.8
      } else if (10 < dsb3 && dsb3 <= 12) {
        bN = 4
        hN = 4
        t1N = 2.5
      } else if (12 < dsb3 && dsb3 <= 17) {
        bN = 5
        hN = 5
        t1N = 3
      } else if (17 < dsb3 && dsb3 <= 22) {
        bN = 6
        hN = 6
        t1N = 3.5
      } else if (22 < dsb3 && dsb3 <= 30) {
        bN = 8
        hN = 7
        t1N = 4
      } else if (30 < dsb3 && dsb3 <= 38) {
        bN = 10
        hN = 8
        t1N = 5
      } else if (38 < dsb3 && dsb3 <= 44) {
        bN = 12
        hN = 8
        t1N = 5
      } else if (44 < dsb3 && dsb3 <= 50) {
        bN = 14
        hN = 9
        t1N = 5.5
      } else if (50 < dsb3 && dsb3 <= 58) {
        bN = 16
        hN = 10
        t1N = 6
      } else if (58 < dsb3 && dsb3 <= 65) {
        bN = 18
        hN = 11
        t1N = 7
      } else if (65 < dsb3 && dsb3 <= 75) {
        bN = 20
        hN = 12
        t1N = 7.5
      } else if (75 < dsb3 && dsb3 <= 85) {
        bN = 22
        hN = 14
        t1N = 9
      } else if (85 < dsb3 && dsb3 <= 95) {
        bN = 25
        hN = 14
        t1N = 9
      } else if (95 < dsb3 && dsb3 <= 110) {
        bN = 28
        hN = 16
        t1N = 10
      } else if (110 < dsb3 && dsb3 <= 130) {
        bN = 32
        hN = 18
        t1N = 11
      } else if (130 < dsb3 && dsb3 <= 150) {
        bN = 36
        hN = 20
        t1N = 12
      } else if (150 < dsb3 && dsb3 <= 170) {
        bN = 40
        hN = 22
        t1N = 13
      } else if (170 < dsb3 && dsb3 <= 200) {
        bN = 45
        hN = 25
        t1N = 15
      } else if (200 < dsb3 && dsb3 <= 230) {
        bN = 50
        hN = 28
        t1N = 17
      } else if (230 < dsb3 && dsb3 <= 260) {
        bN = 56
        hN = 32
        t1N = 20
      } else if (260 < dsb3 && dsb3 <= 290) {
        bN = 63
        hN = 32
        t1N = 20
      } else if (290 < dsb3 && dsb3 <= 330) {
        bN = 70
        hN = 36
        t1N = 22
      } else if (330 < dsb3 && dsb3 <= 380) {
        bN = 80
        hN = 40
        t1N = 25
      } else if (380 < dsb3 && dsb3 <= 440) {
        bN = 90
        hN = 45
        t1N = 28
      } else if (440 < dsb3 && dsb3 <= 500) {
        bN = 100
        hN = 50
        t1N = 31
      } else {
        // Default values or error handling for out-of-range values
        return null
      }

      return { bN, hN, t1N }
    }

    const findingEoEtOfB = (dsb1: number) => {
      let eoB, etB

      if (20 <= dsb1 && dsb1 <= 30) {
        eoB = 0.91
        etB = 0.89
      } else if (30 < dsb1 && dsb1 <= 40) {
        eoB = 0.88
        etB = 0.81
      } else if (40 < dsb1 && dsb1 <= 50) {
        eoB = 0.84
        etB = 0.78
      } else if (50 < dsb1 && dsb1 <= 60) {
        eoB = 0.81
        etB = 0.76
      } else if (60 < dsb1 && dsb1 <= 70) {
        eoB = 0.78
        etB = 0.74
      } else if (70 < dsb1 && dsb1 <= 80) {
        eoB = 0.75
        etB = 0.73
      } else if (80 < dsb1 && dsb1 <= 90) {
        eoB = 0.73
        etB = 0.72
      } else if (100 <= dsb1 && dsb1 <= 120) {
        eoB = 0.7
        etB = 0.7
      } else if (120 < dsb1 && dsb1 <= 140) {
        eoB = 0.68
        etB = 0.68
      } else {
        return null
      }

      return { eoB, etB }
    }

    const findingEoEtOfF = (dsb2: number) => {
      let eoF, etF

      if (20 <= dsb2 && dsb2 <= 30) {
        eoF = 0.91
        etF = 0.89
      } else if (30 < dsb2 && dsb2 <= 40) {
        eoF = 0.88
        etF = 0.81
      } else if (40 < dsb2 && dsb2 <= 50) {
        eoF = 0.84
        etF = 0.78
      } else if (50 < dsb2 && dsb2 <= 60) {
        eoF = 0.81
        etF = 0.76
      } else if (60 < dsb2 && dsb2 <= 70) {
        eoF = 0.78
        etF = 0.74
      } else if (70 < dsb2 && dsb2 <= 80) {
        eoF = 0.75
        etF = 0.73
      } else if (80 < dsb2 && dsb2 <= 90) {
        eoF = 0.73
        etF = 0.72
      } else if (100 <= dsb2 && dsb2 <= 120) {
        eoF = 0.7
        etF = 0.7
      } else if (120 < dsb2 && dsb2 <= 140) {
        eoF = 0.68
        etF = 0.68
      } else {
        // Default values or error handling for out-of-range values
        return null
      }

      return { eoF, etF }
    }

    const findingEoEtOfN = (dsb3: number) => {
      let eoN, etN

      if (20 <= dsb3 && dsb3 <= 30) {
        eoN = 0.91
        etN = 0.89
      } else if (30 < dsb3 && dsb3 <= 40) {
        eoN = 0.88
        etN = 0.81
      } else if (40 < dsb3 && dsb3 <= 50) {
        eoN = 0.84
        etN = 0.78
      } else if (50 < dsb3 && dsb3 <= 60) {
        eoN = 0.81
        etN = 0.76
      } else if (60 < dsb3 && dsb3 <= 70) {
        eoN = 0.78
        etN = 0.74
      } else if (70 < dsb3 && dsb3 <= 80) {
        eoN = 0.75
        etN = 0.73
      } else if (80 < dsb3 && dsb3 <= 90) {
        eoN = 0.73
        etN = 0.72
      } else if (100 <= dsb3 && dsb3 <= 120) {
        eoN = 0.7
        etN = 0.7
      } else if (120 < dsb3 && dsb3 <= 140) {
        eoN = 0.68
        etN = 0.68
      } else {
        // Default values or error handling for out-of-range values
        return null
      }

      return { eoN, etN }
    }

    if (request === 'stage-2') {
      const chapter1 = result.chapter1
      const T_I = chapter1.T_I
      const T_II = chapter1.T_II
      const T_III = chapter1.T_III

      const chapter3 = result.chapter3

      const us_1 = chapter3.o1
      const usxoan_1 = chapter3.t1
      const dsb1 = chapter3.dsb1
      const dsb2 = chapter3.dsb2
      const dsb3 = chapter3.dsb3
      const Mtd1 = chapter3.Mtd1
      const Mtd2 = chapter3.Mtd2
      const Mtd3 = chapter3.Mtd3

      const { bB, hB, t1B } = findingBHT1OfB(dsb1)!
      const { bF, hF, t1F } = findingBHT1OfF(dsb2)!
      const { bN, hN, t1N } = findingBHT1OfN(dsb3)!

      const WB = (Math.PI * dsb1 ** 3) / 32 - (bB * t1B * (dsb1 - t1B) ** 2) / dsb1
      const WF = (Math.PI * dsb2 ** 3) / 32 - (bF * t1F * (dsb2 - t1F) ** 2) / dsb2
      const WN = (Math.PI * dsb3 ** 3) / 32 - (bN * t1N * (dsb3 - t1N) ** 2) / dsb3

      const WB0 = (Math.PI * dsb1 ** 3) / 16 - (bB * t1B * (dsb1 - t1B) ** 2) / dsb1
      const WF0 = (Math.PI * dsb2 ** 3) / 16 - (bF * t1F * (dsb2 - t1F) ** 2) / dsb2
      const WN0 = (Math.PI * dsb3 ** 3) / 16 - (bN * t1N * (dsb3 - t1N) ** 2) / dsb3

      // console.log(Mtd1, Mtd2, Mtd3)

      const usaB = Mtd1 / WB
      const usaF = Mtd2 / WF
      const usaN = Mtd3 / WN

      const usm = 0

      const taB = T_I / (2 * WB0)
      const taF = T_II / (2 * WF0)
      const taN = T_III / (2 * WN0)

      const Kus: number = 1.75
      const Kusxoan: number = 1.5
      const beta: number = 1.8

      const { eoB, etB } = findingEoEtOfB(dsb1)!
      const { eoF, etF } = findingEoEtOfF(dsb2)!
      const { eoN, etN } = findingEoEtOfN(dsb3)!

      const KoBEoB = Kus / (beta * eoB)
      const KoBEoF = Kus / (beta * eoF)
      const KoBEoN = Kus / (beta * eoN)

      const KtBEtB = Kusxoan / (beta * etB)
      const KtBEtF = Kusxoan / (beta * etF)
      const KtBEtN = Kusxoan / (beta * etN)

      const phius: number = 0.05
      const phiusxoan: number = 0

      const soB = us_1 / ((Kus * usaB) / (beta * eoB) + phius * usm)
      const soF = us_1 / ((Kus * usaF) / (beta * eoF) + phius * usm)
      const soN = us_1 / ((Kus * usaN) / (beta * eoN) + phius * usm)

      const stB = usxoan_1 / ((Kusxoan * taB) / (beta * etB) + phiusxoan * usm)
      const stF = usxoan_1 / ((Kusxoan * taF) / (beta * etF) + phiusxoan * usm)
      const stN = usxoan_1 / ((Kusxoan * taN) / (beta * etN) + phiusxoan * usm)

      const sB = (soB * stB) / (soB ** 2 + stB ** 2) ** (1 / 2)
      const sF = (soF * stF) / (soF ** 2 + stF ** 2) ** (1 / 2)
      const sN = (soN * stN) / (soN ** 2 + stN ** 2) ** (1 / 2)

      return super.handle(
        input,
        {
          ...result,
          chapter3: {
            ...result.chapter3,
            bB,
            hB,
            t1B,
            WB,
            WB0,
            usaB,
            taB,
            eoB,
            etB,
            soB,
            stB,
            sB,
            KoBEoB,
            KtBEtB,
            t1F,
            bF,
            hF,
            WF,
            WF0,
            usaF,
            taF,
            eoF,
            etF,
            soF,
            stF,
            sF,
            KoBEoF,
            KtBEtF,
            t1N,
            bN,
            hN,
            WN,
            WN0,
            usaN,
            taN,
            eoN,
            etN,
            soN,
            stN,
            sN,
            KoBEoN,
            KtBEtN
          }
        },
        request
      )
    }

    return super.handle(input, result, request)
  }
}
