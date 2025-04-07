import { IInputData } from '~/interfaces/input.interface'
import { AbstractHandler } from '../abstract.handler'

export class Chapter2Section1Handler extends AbstractHandler {
  private giatritieuchuan: number[] = [
    63, 71, 80, 90, 100, 112, 125, 140, 160, 180, 200, 224, 250, 280, 315, 355, 400, 450, 500, 560, 630, 710, 800, 900,
    1000
  ]

  private chieudaitieuchuan: number[] = [
    400, 450, 500, 560, 630, 710, 800, 900, 1000, 1120, 1250, 1400, 1600, 1800, 2000, 2240, 2500, 2800, 3150, 3550,
    4000, 5000, 5600, 6300, 7100, 8000, 9000, 10000, 11200, 12500, 14000, 16000, 18000
  ]

  private hesotruot: number = 0.01 // hệ số trượt

  public positionEquation = (a: number, b: number, p: number, n: number): number => {
    const temp = n - a * p - b
    if (temp >= 0) {
      return 1
    } else {
      return -1
    }
  }

  public selectBeltType = (p: number, n: number): string => {
    const posD = this.positionEquation(6000 / 577, -18400 / 577, p, n)
    const posC = this.positionEquation(600 / 23, -500 / 23, p, n)
    const posB = this.positionEquation(22000 / 257, -11575 / 257, p, n)
    const posA = this.positionEquation(2930 / 9, -460 / 9, p, n)

    if (p >= 80 && p <= 400 && n <= 800) {
      return 'E'
    } else if (p >= 263 / 6 && p <= 200 && n >= 800 && n <= 1130) {
      return 'D'
    } else if (p >= 22.3 && p <= 125 && n >= 1130 && n <= 1825) {
      return 'C'
    } else if (p >= 11 && p <= 50 && n >= 1825 && n <= 3530) {
      return 'B'
    } else if (p >= 2 && p <= 20 && n >= 3530 && n <= 5000) {
      return 'A'
    } else if (p >= 263 / 6 && p <= 80 && n <= 800) {
      if (posD == 1) {
        return 'D'
      } else return 'E'
    } else if (p >= 22.3 && p <= 236 / 6 && n <= 1130) {
      if (posD == -1) return 'E'
      else if (posC == -1) return 'D'
      else return 'C'
    } else if (p >= 11 && p <= 22.3 && n <= 1825) {
      if (posC == -1) return 'D'
      else if (posB == -1) return 'C'
      else return 'B'
    } else if (p >= 2 && p <= 11 && n <= 3530) {
      if (posC == -1) return 'D'
      else if (posB == -1) return 'C'
      else if (posA == -1) return 'B'
      else return 'A'
    }

    return ''
  }

  public selectStandardValue = (d1: number, result: any): number => {
    let initialIndex = -1
    for (let i = 0; i < this.giatritieuchuan.length; i++) {
      if (this.giatritieuchuan[i] >= d1) {
        initialIndex = i
        break
      }
    }

    if (initialIndex === -1) {
      initialIndex = this.giatritieuchuan.length - 1
    }
    let v1: number = 0
    for (let i = initialIndex; i >= 0; i--) {
      const selectedValue = this.giatritieuchuan[i]
      v1 = (Math.PI * selectedValue * result.engineId.van_toc_quay_vgph) / 60000

      if (v1 <= 25) {
        return selectedValue
      }
    }

    return this.giatritieuchuan[0]
  }

  public computeV1 = (d1: number, result: any): number => {
    return (Math.PI * d1 * result.engineId.van_toc_quay_vgph) / 60000
  }

  public handle = (input: IInputData, result: any): any | null => {
    const result_dai = this.selectBeltType(result.chapter1.P_dc, result.chapter1.n_dc)

    let bp: number = 0
    let bo: number = 0
    let h: number = 0
    let yo: number = 0
    let A: number = 0
    let d: number = 0
    let qm: number = 0

    if (result_dai == 'A') {
      bp = 11
      bo = 13
      h = 8
      yo = 2.8
      A = 81
      d = 100
      qm = 0.105
    } else if (result_dai == 'B') {
      bp = 14
      bo = 17
      h = 10.5
      yo = 4.0
      A = 138
      d = 140
      qm = 0.178
    } else if (result_dai == 'C') {
      bp = 19
      bo = 22
      h = 13.5
      yo = 4.8
      A = 230
      d = 250
      qm = 0.3
    } else if (result_dai == 'D') {
      bp = 27
      bo = 32
      h = 19
      yo = 6.9
      A = 476
      d = 320
    } else if (result_dai == 'E') {
      bp = 32
      bo = 38
      h = 23.5
      yo = 8.3
      A = 692
      d = 500
    } else {
      throw new Error('Không tìm được đai phù hợp')
    }

    let d1: number = 1.2 * d
    d1 = this.selectStandardValue(d1, result.chapter1)

    let finalD1: number = d1
    let finalD2: number = 0
    let finalUtt: number = 0
    let finalError: number = 0
    let found = false

    outer: while (true) {
      const v1 = this.computeV1(d1, result.chapter1)
      if (v1 > 25) {
        throw new Error(`v1 vượt quá giới hạn cho d1 = ${d1}`)
      }

      const d2_computed = result.chapter1.u_dc * d1 * (1 - this.hesotruot)

      for (const candidate of this.giatritieuchuan) {
        const utt = candidate / (d1 * (1 - this.hesotruot))
        const error = (Math.abs(utt - result.chapter1.u_dc) / result.chapter1.u_dc) * 100

        if (error <= 4) {
          finalD2 = candidate
          finalD1 = d1
          finalUtt = utt
          finalError = error
          found = true
          break outer
        }
      }

      const currentIndex = this.giatritieuchuan.indexOf(d1)
      if (currentIndex <= 0) {
        throw new Error('Không thể hạ d1 xuống thêm để đạt yêu cầu sai số')
      }
      d1 = this.giatritieuchuan[currentIndex - 1]
    }

    d1 = finalD1
    const d2 = finalD2
    const utt = finalUtt
    const denta_u = finalError.toFixed(2)
    const v1 = (Math.PI * d1 * result.chapter1.engineId.van_toc_quay_vgph) / 60000

    //1.2.3
    const asb = d2
    let Lsb = 2 * asb + (Math.PI * (d1 + d2)) / 2 + ((d1 - d2) * (d1 - d2)) / (4 * asb)

    const dk_L_thoa = (v1 / 10) * 1000
    let vitricuaL: number = 0
    for (let i = 0; i < this.chieudaitieuchuan.length; i++) {
      if (this.chieudaitieuchuan[i] > Lsb && this.chieudaitieuchuan[i] > dk_L_thoa) {
        Lsb = this.chieudaitieuchuan[i]
        vitricuaL = i
        break
      }
    }

    //so vong dai trong 1 s

    let i_kq = v1 / Lsb

    let k = Lsb - (Math.PI * (d1 + d2)) / 2
    let denta = (d2 - d1) / 2

    let a = (k + Math.sqrt(k * k - 8 * denta * denta)) / 4

    while (a < 0.7 * (d1 + d2) && a > 2 * (d1 + d2)) {
      for (let j = vitricuaL + 1; j < this.chieudaitieuchuan.length; j++) {
        if (this.chieudaitieuchuan[j] > Lsb && this.chieudaitieuchuan[j] > dk_L_thoa) {
          Lsb = this.chieudaitieuchuan[j]
          vitricuaL = j
          i_kq = v1 / Lsb
          k = Lsb - (Math.PI * (d1 + d2)) / 2
          denta = (d2 - d1) / 2
          a = (k + Math.sqrt(k * k - 8 * denta * denta)) / 4
          break
        }
      }
    }

    //1.2.4
    const alpha1 = 180 - 57 * ((d2 - d1) / a)

    //1.2.5
    const Cv = 1 - 0.05 * (0.01 * v1 * v1 - 1)
    const C_alpha = 1.24 * (1 - Math.exp(-(alpha1 / 110)))

    let Cu: number = 0

    if (result.chapter1.u_dc == 1) {
      Cu = 1
    } else if (result.chapter1.u_dc == 1.1) {
      Cu = 1.04
    } else if (result.chapter1.u_dc == 1.2) {
      Cu = 1.07
    } else if (result.chapter1.u_dc == 1.4) {
      Cu = 1.1
    } else if (result.chapter1.u_dc == 1.8) {
      Cu = 1.12
    } else if (result.chapter1.u_dc >= 2.5) {
      Cu = 1.14
    }

    const Cz = 1
    const Cr = 0.85
    const CL = Math.pow(Lsb / 2240, 1 / 6)

    const xx: number = 2.25 + (v1 - 10) * ((2.61 - 2.25) / 5)
    const xx_rounded: number = Math.round(xx * 100) / 100

    const yy: number = 3.38 + (v1 - 10) * ((4.61 - 3.38) / 5)
    const yy_rounded: number = Math.round(yy * 100) / 100

    let P0: number = xx_rounded + (d1 - 125) * ((yy_rounded - xx_rounded) / (180 - 125))
    P0 = Math.round(P0 * 100) / 100

    const z = Math.ceil(result.chapter1.P_dc / (P0 * Cv * C_alpha * Cu * CL * Cz * Cr))

    //1.2.6
    let t: number = 0
    let e: number = 0
    let h0: number = 0
    if (result_dai == 'A') {
      t = 15
      e = 10
      h0 = 3.3
    } else if (result_dai == 'B') {
      t = 19
      h0 = 4.2
      e = 12.5
    } else if (result_dai == 'C') {
      t = 25.5
      h0 = 5.7
      e = 17
    }

    const B = (z - 1) * t + 2 * e
    const da1 = d1 + 2 * h0
    const da2 = d2 + 2 * h0

    //1.3
    //1.3.1
    const Fv = qm * v1 * v1

    //1.3.2
    const Kd = 1.1
    const F0 = (780 * result.chapter1.P_dc * Kd) / (v1 * C_alpha * z) + Fv
    const luccangdaydaiF0 = F0 / z

    //1.3.3
    const Fr = 2 * F0 * z * Math.sin((alpha1 * Math.PI) / 180 / 2)

    //1.3.4
    const Ft = (1000 * result.chapter1.P_dc) / v1
    const luccangdaydaiFt = Ft / z

    //1.3.5
    const E = 100
    const sigma_max = F0 / A + 0.5 * (Ft / A) + Fv / A + ((2 * yo) / d1) * E

    //1.3.6
    const Lhdai = (Math.pow(9 / sigma_max, 8) * Math.pow(10, 7)) / (2 * 3600 * 9.8)

    const beltParameters = {
      d1: d1,
      d2: d2,
      a: a,
      L: Lsb,
      goc_om_dai: alpha1,
      z: z,
      B: B,
      F0: F0,
      Fr: Fr
    }

    return super.handle(input, {
      ...result,
      beltParameters
    })
  }
}
