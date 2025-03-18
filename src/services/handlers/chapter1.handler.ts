import { solveQuartic } from '@littlefattie/solve-equations'
import { IInputData } from '~/interfaces/input.interface'
// import { AbstractHandler } from './abstract.handler'
import Engine from '~/models/engine.model'

const NUM_OF_TAI_TRONG: number = 2
const n_ol: number = 0.99 //Hiệu suất của một cặp ổ lăn
const n_tv: number = 0.85 //Hiệu suất của bộ truyền trục vít
const n_brt: number = 0.96 //Hiệu suất của bộ truyền bánh răng
const n_d: number = 0.94 //Hiệu suất của bộ truyền đai
const n_kn: number = 0.98 //Hiệu suất của khớp nối
const u_d: number = 3 //Tỷ số truyền của bộ truyền đai thang
const u_tv: number = 10 //Tỷ số truyền của bộ truyền trục vít
const u_brt: number = 3 //Tỷ số truyền của bộ truyền bánh răng trụ
const u_kn: number = 1 //Tỷ số truyền của khớp nối
const c: number = 2 //góc nghiêng của răng trục vít
const tany: number = 0.2

export class Chapter1Handler /*extends AbstractHandler*/ {
  // 1.1. Chọn hiệu suất của hệ thống
  public calculateEta = (): number => {
    return n_ol ** 4 * n_tv * n_brt * n_d * n_kn
  }

  //1.2. Tính công suất tương đương (công suất tính toán) Ptđ
  public calculatePtd = (input: IInputData): number => {
    const P = (input.F * input.v) / 1000 //Công suất trên trục công tác

    let tu_so = 0
    let mau_so = 0

    for (let i = 0; i < NUM_OF_TAI_TRONG; i++) {
      let t, T
      if (i == 0) {
        t = input.t1
        T = input.T1
      } else {
        t = input.t2
        T = input.T2
      }
      tu_so += (T / Math.max(input.T1, input.T2)) ** 2 * t
      mau_so += t
    }

    const P_td = P * Math.sqrt(tu_so / mau_so)
    return P_td
  }

  //1.3. Chọn động cơ điện, bảng thông số động cơ điện

  //1.3.1. Công suất cần thiết
  public calculatePct = (P_td: number, Eta: number): number => {
    return P_td / Eta
  }
  //1.3.2. Xác định số vòng quay sơ bộ của động cơ

  public calculateNlv = (input: IInputData): number => {
    return (60000 * input.v) / (input.z * input.p) //Số vòng quay của trục máy công tác
  }

  public calculateNsb = (input: IInputData, n_lv: number): number => {
    const u_t = u_d * u_tv * u_brt * u_kn //Tỷ số truyền cho toàn hệ thống
    const n_sb = u_t * n_lv //Số vòng quay sơ bộ của động cơ
    return n_sb
  }

  //1.4 Chọn động cơ
  public chooseEngine = async (P_ct: number, n_sb: number) => {
    const tolerance = 0.4 //Sai số cho phép
    const engines = await Engine.find({
      cong_suat_kW: { $gte: P_ct },
      $expr: {
        $lte: [{ $abs: { $subtract: ['$van_toc_quay_vgph', n_sb] } }, n_sb * tolerance]
      }
    })

    return engines
  }

  public stage1 = async (input: IInputData): Promise<object | null> => {
    const Eta = this.calculateEta()
    const P_td = this.calculatePtd(input)
    const P_ct = this.calculatePct(P_td, Eta)
    const n_lv = this.calculateNlv(input)
    const n_sb = this.calculateNsb(input, n_lv)
    const engines = await this.chooseEngine(P_ct, n_sb)
    return {
      n_lv,
      P_td,
      engines
    }
  }

  // 2. Phân phối tỷ số truyền

  //Tính toán u trục vít
  public calculateUtv = (u_h: number) => {
    const firstNumber = c ** 3 * tany ** 3
    const secondNumber = 3 * c ** 3 * tany ** 2
    const thirdNumber = 3 * c ** 3 * tany
    const fourthNumber = c ** 3 - tany ** 2 * u_h ** 2
    const fifthNumber = -(tany ** 2 * u_h ** 3)
    const result = solveQuartic(firstNumber, secondNumber, thirdNumber, fourthNumber, fifthNumber)
    const finalResult = result.find((item) => item.re >= 0 && item.im === 0)
    return finalResult.re //Trả về phần thực
  }

  // 3. Xác định các thông số động học và lực của các trục

  public stage2 = (n_lv: number, P_td: number, engine: any) => {
    // 2. Phân phối tỷ số truyền
    const u_t = engine.van_toc_quay_vgph / n_lv //tỷ số truyền ut của hệ dẫn động
    const u_h = u_t / u_d //tỷ số truyền hộp giảm tốc
    const u_tv = this.calculateUtv(u_h) //tính u_tv
    const u_brt = u_h / u_tv //tỷ số truyền của bánh răng trụ thẳng
    const u_kt = u_tv * u_brt * u_d

    // 3. Xác định các thông số động học và lực của các trục

    // 3.1. Tính toán tốc độ quay trên các trục
    const n_dc = engine.van_toc_quay_vgph //Trục động cơ
    const n_1 = n_dc / u_d //Trục I
    const n_2 = n_1 / u_tv //Trục II
    const n_3 = n_2 / u_brt //Trục III

    // 3.2. Tính công suất trên các trục
    const P_3 = P_td / (n_kn * n_ol) //Công suất danh nghĩa trên trục III
    const P_2 = P_3 / (n_brt * n_ol) //Công suất danh nghĩa trên trục II
    const P_1 = P_2 / (n_tv * n_ol) //Công suất danh nghĩa trên trục I
    const P_dc = P_1 / (n_d * n_ol) //Công suất danh nghĩa trên trục động cơ

    // 3.3.Tính momen xoắn trên các trục
    const T_1 = 9.55 * 10 ** 6 * (P_1 / n_1)
    const T_2 = 9.55 * 10 ** 6 * (P_2 / n_2)
    const T_3 = 9.55 * 10 ** 6 * (P_3 / n_3)
    const T_dc = 9.55 * 10 ** 6 * (P_dc / n_dc)

    return {
      P_dc,
      P_I: P_1,
      P_II: P_2,
      P_III: P_3,
      n_dc,
      n_I: n_1,
      n_II: n_2,
      n_III: n_3,
      u_dc: u_d,
      u_I_II: u_tv,
      u_II_III: u_brt,
      T_dc,
      T_I: T_1,
      T_II: T_2,
      T_III: T_3
    }
  }

  // public handle = async (input: IInputData, result: object): Promise<object | null> => {
  //   const Eta = this.calculateEta()
  //   const P_td = this.calculatePtd(input)
  //   const P_ct = this.calculatePct(P_td, Eta)
  //   const n_sb = this.calculateNsb(input)
  //   const engine = await this.chooseEngine(P_ct, n_sb)
  //   return {
  //     Eta,
  //     P_td,
  //     P_ct,
  //     n_sb,
  //     engine
  //   }
  // }
}
