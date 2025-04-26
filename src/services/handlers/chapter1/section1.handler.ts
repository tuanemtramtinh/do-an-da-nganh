import { IInputData } from '~/interfaces/input.interface'
import { AbstractHandler } from '../abstract.handler'
import Engine from '~/models/engine.model'

const NUM_OF_TAI_TRONG: number = 2
const u_d: number = 3 //Tỷ số truyền của bộ truyền đai thang
const u_tv: number = 10 //Tỷ số truyền của bộ truyền trục vít
const u_brt: number = 3 //Tỷ số truyền của bộ truyền bánh răng trụ
const u_kn: number = 1 //Tỷ số truyền của khớp nối

export class Chapter1Section1Handler extends AbstractHandler {
  // 1.1. Chọn hiệu suất của hệ thống
  public calculateEta = (n_ol: number, n_tv: number, n_brt: number, n_d: number, n_kn: number): number => {
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
    // const engines = await Engine.find({
    //   $expr: {
    //     $gte: [{ $subtract: ['$cong_suat_kW', P_ct] }, 0]
    //   }
    // })
    //   .sort({ cong_suat_kW: 1 })
    //   .lean()
    // const firstEnginePower = engines[0].cong_suat_kW
    // const filterEngines = engines.filter((engine) => engine.cong_suat_kW === firstEnginePower)
    // let minN = 999999
    // let choosenEngine
    // for (const engine of filterEngines) {
    //   const n = engine.van_toc_quay_vgph
    //   if (Math.abs(n - n_sb) < minN) {
    //     minN = Math.abs(n - n_sb)
    //     choosenEngine = engine
    //   }
    // }
    // return choosenEngine
  }

  public async handle(input: IInputData, result: any, request: string = ''): Promise<any | null> {
    //initial: Chưa làm gì hết, cho người dùng chọn 4 thông số
    if (request == 'initial') {
      const chapter1 = result.chapter1
      const Eta = this.calculateEta(chapter1.n_ol, chapter1.n_tv, chapter1.n_brt, chapter1.n_d, chapter1.n_kn)
      const P_td = this.calculatePtd(input)
      const P_ct = this.calculatePct(P_td, Eta)
      const n_lv = this.calculateNlv(input)
      const n_sb = this.calculateNsb(input, n_lv)
      const engines = await this.chooseEngine(P_ct, n_sb)
      return {
        chapter1: {
          ...result.chapter1,
          // Eta,
          P_td,
          // P_ct,
          n_lv,
          // n_sb,
          engines
        }
      }
    }
    return super.handle(input, result, request)
  }
}
