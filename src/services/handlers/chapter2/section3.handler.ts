import { IInputData } from '~/interfaces/input.interface'
import { AbstractHandler } from '../abstract.handler'

interface BanhRang {
  do_ran_hb: number
  gioi_han_ben: number
  gioi_han_chay: number
}

export class Chapter2Section3Handler extends AbstractHandler {
  public handle(input: IInputData, result: any, request: string = ''): any | null {
    //Chọn vật liệu
    const section3_1 = () => {
      //Bánh răng nhỏ
      const B1: BanhRang = {
        do_ran_hb: 270, //Độ rắn HB
        gioi_han_ben: 950, //Giới hạn bền
        gioi_han_chay: 700 //Giới hạn chảy
      }

      //Bánh răng lớn
      const B2: BanhRang = {
        do_ran_hb: 245, //Độ rắn HB
        gioi_han_ben: 850, //Giới hạn bền
        gioi_han_chay: 550 //Giới hạn chảy
      }

      return { B1, B2 }
    }

    //Xác định ứng suất cho phép
    const section3_2 = (B1: BanhRang, B2: BanhRang) => {
      const KFC = 1 //hệ số xét đến ảnh hưởng đặt tải
      const ZrZvKxh = 1
      const YrYsKxf = 1
      const Sh = 1.1
      const Sf = 1.75

      const usHlim1 = 2 * B1.do_ran_hb + 70 // ứng suất tiếp xúc cho phép bánh 1
      const usHlim2 = 2 * B2.do_ran_hb + 70 // ứng suất tiếp xúc cho phép bánh 2
      const usFlim1 = 1.8 * B1.do_ran_hb // ứng suất uốn cho phép bánh 1
      const usFlim2 = 1.8 * B2.do_ran_hb // ứng suất uốn cho phép bánh 2

      const mH = 6 //bậc của đường cong mỏi khi thử về tiếp xúc
      const mF = 6 //bậc của đường cong mỏi khi thử về uốn

      const NHO1 = 30 * B1.do_ran_hb ** 2.4 //số chu kỳ thay đổi ứng suất cơ sở khi thử về tiếp xúc bánh 1
      const NHO2 = 30 * B2.do_ran_hb ** 2.4 //số chu kỳ thay đổi ứng suất cơ sở khi thử về tiếp xúc bánh 2
      const NFO = 4 * 10 ** 6 //số chu kỳ thay đổi ứng suất cơ sở khi thử về uốn

      const c = 1 //số lần ăn khớp trong 1 vòng quay
      // Số chu kỳ thay đổi ứng suất tương đương, trường hợp bộ truyền làm việc với tải trọng thay đổi nhiều bậc
      const NHE1 =
        60 *
        c *
        result.chapter1.n_II *
        (input.T1 ** 3 * (input.t1 / (input.t1 + input.t2)) + input.T2 ** 3 * (input.t2 / (input.t1 + input.t2))) *
        input.L *
        8760
      const NHE2 =
        60 *
        c *
        result.chapter1.n_III *
        (input.T1 ** 3 * (input.t1 / (input.t1 + input.t2)) + input.T2 ** 3 * (input.t2 / (input.t1 + input.t2))) *
        input.L *
        8760
      const NFE1 =
        60 *
        c *
        result.chapter1.n_II *
        (input.T1 ** 6 * (input.t1 / (input.t1 + input.t2)) + input.T2 ** 6 * (input.t2 / (input.t1 + input.t2))) *
        input.L *
        8760
      const NFE2 =
        60 *
        c *
        result.chapter1.n_III *
        (input.T1 ** 6 * (input.t1 / (input.t1 + input.t2)) + input.T2 ** 6 * (input.t2 / (input.t1 + input.t2))) *
        input.L *
        8760
      const KHL = 1
      const KFL = 1

      // Ứng suất tiếp xúc cho phép:
      const usH1 = usHlim1 * (KHL / Sh)
      const usH2 = usHlim2 * (KHL / Sh)
      const usF1 = usFlim1 * ((KFL * KFC) / Sf)
      const usF2 = usFlim2 * ((KFL * KFC) / Sf)

      const usH = Math.min(usH1, usH2)

      const usH1Max = 2.8 * B1.gioi_han_chay
      const usH2Max = 2.8 * B2.gioi_han_chay
      const usF1Max = 0.8 * B1.gioi_han_chay
      const usF2Max = 0.8 * B2.gioi_han_chay

      return {
        usH,
        usF1,
        usF2
      }
    }

    // 3.3 Xác định các thông số cơ bản của bộ truyền
    const section3_3 = (usH: number) => {
      const Ka = 49.5 // hệ số phụ thuộc vật liệu của cặp bánh răng và loại răng
      const ba = 0.4
      const bd = 0.53 * ba * (result.chapter1.u_II_III + 1)
      const KHB = 1.05 // hệ số kể đến sự phân bố không đều tải trọng trên chiều rộng vành răng khi tính về tiếp xúc
      const aw =
        Ka *
        (result.chapter1.u_II_III + 1) *
        ((result.chapter1.T_II * KHB) / (usH ** 2 * result.chapter1.u_II_III * ba)) ** (1 / 3) //Khoảng cách trục
      const aw_rounded = Math.ceil(aw / 100) * 100 //Khoảng cách trục làm tròn
      const Kd = 77 //hệ số phụ thuộc vật liệu của cặp bánh răng và loại răng
      const dw1 =
        Kd *
        ((result.chapter1.T_II * KHB * (result.chapter1.u_II_III + 1)) / (usH ** 2 * result.chapter1.u_II_III * bd)) **
          (1 / 3) //Đường kính vòng lăn bánh nhỏ
      // console.log(aw, aw_rounded, dw1);
      return {
        KHB,
        ba,
        aw: aw_rounded
      }
    }

    // 3.4. Xác định thông số ăn khớp
    const section3_4 = (aw: number) => {
      const kyValues = [
        0.008, 0.032, 0.063, 0.114, 0.178, 0.243, 0.318, 0.41, 0.51, 0.622, 0.74, 0.87, 1, 1.145, 1.295, 1.45, 1.622,
        1.792, 1.985, 2.16, 2.34, 2.53, 2.742, 2.94, 3.155, 3.38, 3.605, 3.835, 4.065, 4.29, 4.54, 4.785, 5.03, 5.28,
        5.52, 5.79, 6.05, 6.315, 6.585, 6.86, 7.14, 7.42, 7.7, 8, 8.29, 8.59, 8.885, 9.175, 9.46, 9.765
      ]
      const m_test1 = 0.01 * aw
      const m_test2 = 0.02 * aw
      const m_test = (m_test1 + m_test2) / 2
      let m: number = 0
      if (m_test < 1.35) {
        m = 1.25
      } else if (m_test < 1.75) {
        m = 1.5
      } else if (m_test < 2.25) {
        m = 2
      } else if (m_test < 2.75) {
        m = 2.5
      } else if (m_test < 3.5) {
        m = 3
      } else if (m_test < 4.5) {
        m = 4
      } else if (m_test < 5.5) {
        m = 5
      } else if (m_test < 7) {
        m = 6
      } else if (m_test < 9) {
        m = 8
      } else if (m_test < 11) {
        m = 10
      } else if (m_test <= 12) {
        m = 14
      }

      const B = 0 //răng thẳng góc nghiêng

      if (m === 0) {
        throw new Error('Invalid m value')
      }

      const z1 = (2 * aw) / (m * (result.chapter1.u_II_III + 1)) //số răng bánh nhỏ
      const z1_rounded = Math.ceil(z1) //số răng bánh nhỏ làm tròn
      const z2 = result.chapter1.u_II_III * z1_rounded //số răng bánh lớn
      const z2_rounded = Math.ceil(z2) //số răng bánh lớn làm tròn
      const zt = z1_rounded + z2_rounded
      const awtt = (m * zt) / 2

      let x1 = 0,
        x2 = 0
      if (z1_rounded >= 14 && z1_rounded <= 20 && result.chapter1.u_II_III >= 3.15) {
        x1 = 0.3
        x2 = -0.3
      } else if (z1_rounded <= 30) {
        x1 = 0.5
        x2 = 0.5
      }

      const xt = x1 + x2
      const kx = (1000 * xt) / zt
      const ky = kyValues.find((value, idx) => kx < idx + 1)
      if (!ky) {
        throw new Error('Invalid ky value')
      }
      const dentay = (ky * zt) / 1000 //Xác định hệ số giảm đỉnh răng

      const alpha = 20 //Góc profin gốc

      // Xác định góc ăn khớp
      const aw_test = (0.5 * zt + xt - dentay) * m
      const atw_test = (zt * m * Math.cos((alpha * Math.PI) / 180)) / (2 * aw_test)
      const atw_radians = Math.acos(atw_test)
      const atw_degrees = atw_radians * (180 / Math.PI)
      const atw = Number(atw_degrees.toFixed(2))

      const a_test = (0.5 * m * (z1_rounded + z2_rounded)) / Math.cos(B) //Khoảng cách trục chia

      const a = Math.floor(a_test) //Khoảng cách trục chia làm tròn

      const awx = a //Khoảng cách trục

      //Đường kính chia
      const d1 = (m * z1_rounded) / Math.cos(B)
      const d2 = (m * z2_rounded) / Math.cos(B)

      const y = xt - dentay //hệ số dịch tâm

      //Đường kính lăn
      const dw1 = d1 + ((2 * y) / (z1_rounded + z2_rounded)) * d1
      const dw2 = dw1 * result.chapter1.u_II_III

      //Đường kính đỉnh răng
      const da1 = d1 + 2 * m
      const da2 = d2 + 2 * m

      //Đường kính đáy răng
      const df1 = d1 - 2.5 * m
      const df2 = d2 - 2.5 * m

      //Đường kính cơ sở
      const db1 = d1 * Math.cos((alpha * Math.PI) / 180)
      const db2 = d2 * Math.cos((alpha * Math.PI) / 180)

      const at = Math.atan(Math.tan((alpha * Math.PI) / 180) / Math.cos(B))
      const at_degrees = at * (180 / Math.PI)

      const epsilona = (1.88 - 3.2 * (1 / z1_rounded + 1 / z2_rounded)) * Math.cos(B) //Hệ số trùng khớp ngang

      const alpha1 = (Math.acos(db1 / da1) * 180) / Math.PI
      const alpha2 = (Math.acos(db2 / da2) * 180) / Math.PI

      return {
        m,
        at,
        atw: atw_radians,
        aw: awx,
        dw1,
        dw2,
        alpha1,
        alpha2,
        epsilona,
        B,
        z1: z1_rounded,
        z2: z2_rounded,
        x1,
        x2,
        d1,
        d2,
        df1,
        df2,
        da1,
        da2,
        aw_test
      }
    }

    // 3.5. Kiểm nghiệm răng về độ bền tiếp xúc
    const section3_5 = (
      m: number,
      ba: number,
      B: number,
      at: number,
      atw: number,
      aw: number,
      dw1: number,
      dw2: number,
      epsilona: number,
      KHB: number
    ) => {
      const ZM = 274 //hệ số kể đến cơ tính vật liệu của các bánh răng ăn khớp

      const Betab = Math.atan(Math.cos(at) * Math.tan(B))
      // const Betab_rounded = Math.ceil(Betab)
      const ZH = ((2 * Math.cos(Betab)) / Math.sin(2 * atw)) ** (1 / 2) //hệ số kể đến hình dạng tiếp xúc
      const epsilonb = (ba * aw * Math.sin(B)) / (Math.PI * m)
      const Ze = ((4 - epsilona) / 3) ** (1 / 2) //hệ số kể đến trùng khớp của răng

      const KHA = 1 // hệ số kể đến sự phân bố tải trọng cho các đôi răng đồng thời ăn khớp

      const v = (Math.PI * dw1 * result.chapter1.n_II) / 6000
      const v_rounded = parseFloat(v.toFixed(1))

      const H = 0.006 //Trị số của các hệ số kể đến ảnh hưởng của sai số ăn khớp H
      const F = 0.016 //Trị số của các hệ số kể đến ảnh hưởng của sai số nă khớp F

      let ccx: number = 0
      if (v < 1.5) ccx = 9
      else if (1.5 < v && v < 7.5) ccx = 8
      else if (7.5 < v && v < 12) ccx = 7
      else if (12 < v && v < 25) ccx = 6

      let g0: number = 0
      if (ccx === 6 && m < 3.55) {
        g0 = 38
      } else if (ccx === 6 && m > 3.55 && m < 10) {
        g0 = 42
      } else if (ccx === 6 && m > 10) {
        g0 = 48
      } else if (ccx === 7 && m < 3.55) {
        g0 = 47
      } else if (ccx === 7 && m > 3.55 && m < 10) {
        g0 = 53
      } else if (ccx === 7 && m > 10) {
        g0 = 64
      } else if (ccx === 8 && m < 3.55) {
        g0 = 56
      } else if (ccx === 8 && m > 3.55 && m < 10) {
        g0 = 61
      } else if (ccx === 8 && m > 10) {
        g0 = 73
      } else if (ccx === 9 && m < 3.55) {
        g0 = 73
      } else if (ccx === 9 && m > 3.55 && m < 10) {
        g0 = 82
      } else if (ccx === 9 && m > 10) {
        g0 = 100
      }

      const VH = H * g0 * v_rounded * (aw / result.chapter1.u_II_III) ** (1 / 2)

      const bw = ba * aw
      const KHV = 1 + (VH * bw * dw1) / (2 * result.chapter1.T_II * KHB * KHA)
      const KH = KHB * KHA * KHV

      const usHtest =
        ZM *
        ZH *
        Ze *
        ((2 * result.chapter1.T_II * KH * (result.chapter1.u_II_III + 1)) /
          (bw * result.chapter1.u_II_III * dw1 ** 2)) **
          (1 / 2)

      return {
        F,
        g0,
        v,
        bw
      }
    }

    // 3.6. Kiểm nghiệm răng về độ bền uốn
    const section3_6 = (
      epsilona: number,
      x1: number,
      x2: number,
      z1: number,
      z2: number,
      F: number,
      g0: number,
      v: number,
      aw: number,
      bw: number,
      dw1: number,
      m: number
    ) => {
      const Yepsilone = 1 / epsilona //hệ số trùng khớp răng,

      const YB = 1 // hệ số kể đến độ nghiêng của răng, với răng thẳng YB = 1

      let YF1: number = 0 //hệ số dạng răng bánh 1
      if (x1 === 0.5) {
        if (z1 === 11 || z1 === 12) YF1 = 3.46
        else if (z1 === 13 || z1 === 14) YF1 = 3.42
        else if (z1 >= 15 && z1 <= 17) YF1 = 3.4
        else if (z1 >= 18 && z1 <= 28) YF1 = 3.39
        else if (z1 >= 29 && z1 <= 35) YF1 = 3.4
        else if (z1 >= 35 && z1 <= 45) YF1 = 3.42
        else if (z1 >= 45 && z1 <= 55) YF1 = 3.44
        else if (z1 >= 55 && z1 <= 70) YF1 = 3.47
        else if (z1 >= 70 && z1 <= 90) YF1 = 3.5
        else if (z1 >= 90 && z1 <= 125) YF1 = 3.52
      } else if (x1 === 0.3) {
        if (z1 === 11 || z1 === 12) YF1 = 3.89
        else if (z1 === 13 || z1 === 14) YF1 = 3.78
        else if (z1 === 15 || z1 === 16) YF1 = 3.72
        else if (z1 >= 17 && z1 <= 18) YF1 = 3.67
        else if (z1 === 19 || z1 === 20) YF1 = 3.61
        else if (z1 === 21 || z1 === 22) YF1 = 3.59
        else if (z1 >= 23 && z1 <= 28) YF1 = 3.57
        else if (z1 >= 29 && z1 <= 35) YF1 = 3.54
        else if (z1 >= 35 && z1 <= 45) YF1 = 3.53
        else if (z1 >= 45 && z1 <= 55) YF1 = 3.52
        else if (z1 >= 55 && z1 <= 70) YF1 = 3.53
        else if (z1 >= 70 && z1 <= 90) YF1 = 5.54
        else if (z1 >= 90 && z1 <= 125) YF1 = 3.55
      }

      let YF2 = 0 //hệ số dạng răng bánh 2
      if (x2 === 0.5) {
        if (z2 === 11 || z2 === 12) YF2 = 3.46
        else if (z2 === 13 || z2 === 14) YF2 = 3.42
        else if (z2 >= 15 && z2 <= 17) YF2 = 3.4
        else if (z2 >= 18 && z2 <= 28) YF2 = 3.39
        else if (z2 >= 29 && z2 <= 35) YF2 = 3.4
        else if (z2 >= 35 && z2 <= 45) YF2 = 3.42
        else if (z2 >= 45 && z2 <= 55) YF2 = 3.44
        else if (z2 >= 55 && z2 <= 70) YF2 = 3.47
        else if (z2 >= 70 && z2 <= 90) YF2 = 3.5
        else if (z2 >= 90 && z2 <= 125) YF2 = 3.52
      } else if (x2 === -0.3) {
        if (z2 >= 25 && z2 <= 28) YF2 = 4.28
        else if (z2 >= 29 && z2 <= 35) YF2 = 4.14
        else if (z2 >= 35 && z2 <= 45) YF2 = 3.92
        else if (z2 >= 45 && z2 <= 55) YF2 = 3.81
        else if (z2 >= 55 && z2 <= 70) YF2 = 3.74
        else if (z2 >= 70 && z2 <= 90) YF2 = 3.68
        else if (z2 >= 90 && z2 <= 125) YF2 = 3.65
        else if (z2 >= 126 && z2 <= 150) YF2 = 3.63
      }

      const KFB = 1.1 //hệ số kể đến sự phân bố không đều tải trọng trên vành răng
      const KFA = 1 //hệ số kể đến sự phân bố không đều tải trọng cho các đôi răng đồng thời ăn khớp

      const vF = F * g0 * v * (aw / result.chapter1.u_II_III) ** (1 / 2)
      const KFV = 1 + (vF * bw * dw1) / (2 * result.chapter1.T_II * KFB * KFA)
      const KF = KFB * KFA * KFV

      const usF1test = (2 * result.chapter1.T_II * KF * Yepsilone * YB * YF1) / (bw * dw1 * m)
      const usF2test = usF1test * (YF2 / YF1)
    }

    //3.7. Kiểm nghiệm độ bền quá tải
    const section3_7 = (usH: number, usF1: number, usF2: number) => {
      const Kqt = 1
      const usHmaxtest = usH * Kqt ** (1 / 2)
      const usF1maxtest = usF1 * Kqt
      const usF2maxtest = usF2 * Kqt
    }

    const { B1, B2 } = section3_1()
    const { usH, usF1, usF2 } = section3_2(B1, B2)
    const { KHB, ba, aw } = section3_3(usH)
    const {
      m,
      at,
      atw,
      aw: awx,
      dw1,
      dw2,
      alpha1,
      alpha2,
      epsilona,
      B,
      z1,
      z2,
      x1,
      x2,
      d1,
      d2,
      df1,
      df2,
      da1,
      da2,
      aw_test
    } = section3_4(aw)
    const { F, g0, v, bw } = section3_5(m, ba, B, at, atw, awx, dw1, dw2, epsilona, KHB)
    section3_6(epsilona, x1, x2, z1, z2, F, g0, v, awx, bw, dw1, m)
    section3_7(usH, usF1, usF2)

    const gearSpecification = {
      d1,
      d2,
      da1,
      da2,
      df1,
      df2,
      dw1,
      dw2,
      awx,
      bw
    }
    return super.handle(
      input,
      {
        ...result,
        gearSpecification,
        aw_test
      },
      request
    )
  }
}
