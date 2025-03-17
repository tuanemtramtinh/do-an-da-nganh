import { IInputData } from '~/interfaces/input.interface'
import { AbstractHandler } from './abstract.handler'
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

export class Chapter1Handler extends AbstractHandler {
  // 1.1. Chọn hiệu suất của hệ thống
  public calculateEta = (input: IInputData): number => {
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
  public calculateNsb = (input: IInputData): number => {
    const n_lv = (60000 * input.v) / (input.z * input.p) //Số vòng quay của trục máy công tác
    const u_t = u_d * u_tv * u_brt * u_kn //Tỷ số truyền cho toàn hệ thống
    const n_sb = u_t * n_lv //Số vòng quay sơ bộ của động cơ
    return n_sb
  }

  //1.4 Chọn động cơ
  public chooseEngine = async (P_ct: number, n_sb: number) => {
    const tolerance = 0.4 * n_sb //Sai số vòng quay (Tạm thời)
    console.log(P_ct, n_sb, n_sb - tolerance, n_sb + tolerance)
    const engine = await Engine.find({
      cong_suat_kW: { $gte: P_ct },
      van_toc_quay_vgph: { $gte: n_sb - tolerance, $lte: n_sb + tolerance }
    })
    return engine
  }

  public handle = async (input: IInputData, result: object): Promise<object | null> => {
    const Eta = this.calculateEta(input)
    const P_td = this.calculatePtd(input)
    const P_ct = this.calculatePct(P_td, Eta)
    const n_sb = this.calculateNsb(input)
    const engine = await this.chooseEngine(P_ct, n_sb)
    return {
      Eta,
      P_td,
      P_ct,
      n_sb,
      engine
    }
  }
}
