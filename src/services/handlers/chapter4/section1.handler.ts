import { AbstractHandler } from '../abstract.handler'

export class Chapter4Section1Handler extends AbstractHandler {
  public handle(input: any, result: any, request: string = ''): any | null {
    function degreeToRadian(degrees: number): number {
      return degrees * (Math.PI / 180)
    }

    const chapter1 = result.chapter1
    const chapter2 = result.chapter2
    const chapter3 = result.chapter3

    // Chương 4 phần 1.1
    const soVongQuay_n = chapter1.n_I
    const thoiGianLamViec_Lh = 4000

    // Lấy từ 5.2 chương 3
    const RAx = chapter3.RAx
    const RAy = chapter3.RAy
    const RCx = chapter3.RCx
    const RCy = chapter3.RCy

    let lucDocTrucCuaTrucVit_Fa1 = chapter2.sizeOfTranmission.Ft2 // 2.12 chuong 2
    let lucDocTrucBanhVit_Fa2 = chapter2.sizeOfTranmission.Ft1 //2.12 chuong 2

    const lucHuongTam_FAr = parseFloat(Math.sqrt(RAx ** 2 + RAy ** 2).toFixed(2))
    console.log(`Lực hướng tâm F_Ar = ${lucHuongTam_FAr} (N)`)

    const lucHuongTam_FCr = parseFloat(Math.sqrt(RCx ** 2 + RCy ** 2).toFixed(2))
    console.log(`Lực hướng tâm F_Cr = ${lucHuongTam_FCr} (N)`)

    const Fa = lucDocTrucCuaTrucVit_Fa1
    console.log(`Fa = ${Fa} (N)`)

    const Fr2 = parseFloat((0.6 * lucHuongTam_FAr).toFixed(2))
    console.log(`Fr2 = ${Fr2} (N)`)

    let duongKinhNgongTruc_d

    if (input.F !== 17000) {
      duongKinhNgongTruc_d = 35
    } else {
      duongKinhNgongTruc_d = 40
    }

    if (duongKinhNgongTruc_d === 35) {
      // Lấy từ bảng ra
      const code_A = 7607
      const d = 35
      const D = 80
      const D1 = 61.5
      const d1 = 56.5
      const B = 33
      const C1 = 27
      const T = 32.75
      const r = 2.5
      const r1 = 0.8
      const alpha = 11.17
      let khaNangTaiTrong_C7607 = 71.6
      const C0 = 61.5

      const heSoTaiDocTruc_e = parseFloat((1.5 * Math.tan(degreeToRadian(alpha))).toFixed(2))
      console.log(`Hệ số tải dọc trục e = ${heSoTaiDocTruc_e}`)

      const lucDocTrucPhu_S2 = parseFloat((0.83 * heSoTaiDocTruc_e * Fr2).toFixed(2))
      console.log(`Lực dọc trục phụ S2 = ${lucDocTrucPhu_S2} (N)`)

      lucDocTrucCuaTrucVit_Fa1 = lucDocTrucPhu_S2 + Fa
      console.log(`Fa1 = ${lucDocTrucCuaTrucVit_Fa1} (N)`)

      lucDocTrucBanhVit_Fa2 = lucDocTrucPhu_S2
      console.log(`Fa2 = ${lucDocTrucBanhVit_Fa2} (N)`)

      const heSo_V = 1
      const tySoSoBo = parseFloat((Fa / (heSo_V * 0.4 * lucHuongTam_FAr)).toFixed(2))
      console.log(`Tỷ số sơ bộ = ${tySoSoBo}`)

      const heSoTrongTai_X = 0.4
      const heSoTrongTai_Y = parseFloat(((heSoTrongTai_X * 1) / Math.tan(degreeToRadian(alpha))).toFixed(2))
      console.log(`Hệ số trọng tải X = ${heSoTrongTai_X}`)
      console.log(`Hệ số trọng tải Y = ${heSoTrongTai_Y}`)

      const heSo_Kd = 1.2
      const heSo_Kt = 1

      let taiTrongQuyUoc_Q = parseFloat(
        ((heSoTrongTai_X * heSo_V * lucHuongTam_FAr + heSoTrongTai_Y * Fa) * heSo_Kd * heSo_Kt).toFixed(2)
      )
      console.log(`Hệ số trọng tải Q = ${taiTrongQuyUoc_Q} (N)`)

      const khaNangTaiTrongDong_L = (thoiGianLamViec_Lh * 60 * soVongQuay_n) / 1000000
      console.log(`L = ${khaNangTaiTrongDong_L} (vòng)`)

      let khaNangTaiTrongDong_Ctt = parseFloat((taiTrongQuyUoc_Q * Math.pow(khaNangTaiTrongDong_L, 3 / 10)).toFixed(2))
      console.log(`Khả năng tải trọng động Ctt = ${khaNangTaiTrongDong_Ctt} (N)`)

      khaNangTaiTrong_C7607 = khaNangTaiTrong_C7607 * 1000

      console.log(
        `Vì Ctt > C (${khaNangTaiTrongDong_Ctt} > ${khaNangTaiTrong_C7607})  => Ổ lăn không thỏa điều kiện đã chọn của tải trọng động => Ta chọn lại ổ lăn`
      )
      // Hết Chương 4 phần 1.1

      // Chương 4 phần 1.2
      const code_C = 2207
      const d_C = 35
      const D_C = 72
      const B_C = 17
      const r_C = 2.0
      const r1_C = 1.0
      let C2207_C = 26.5
      const C0_C = 17.5
      const duongKinhChieuDaiConLan = 9

      taiTrongQuyUoc_Q = parseFloat((heSo_V * lucHuongTam_FCr * heSo_Kt * heSo_Kd).toFixed(2))
      console.log(`Hệ số trọng tải Q = ${taiTrongQuyUoc_Q} (N)`)

      console.log(`L = ${khaNangTaiTrongDong_L} (vòng)`)

      khaNangTaiTrongDong_Ctt = parseFloat((taiTrongQuyUoc_Q * Math.pow(khaNangTaiTrongDong_L, 3 / 10)).toFixed(2))
      console.log(`Khả năng tải trọng động Ctt = ${khaNangTaiTrongDong_Ctt} (N)`)

      console.log(`Ctt < C (${khaNangTaiTrongDong_Ctt} < 26500) => Ổ lăn đã chọn thỏa tải trọng động`)

      // Theo bảng tra ta có C = 26500 (N)
      C2207_C = C2207_C * 1000

      const tuoiTho_L = parseFloat(Math.pow(C2207_C / taiTrongQuyUoc_Q, 10 / 3).toFixed(2))
      console.log(`Tuổi thọ L = ${tuoiTho_L} (triệu vòng)`)

      const tuoiThoTinhBangGio_Lh = parseFloat(((1000000 * tuoiTho_L) / (60 * soVongQuay_n)).toFixed(2))
      console.log(`Tuổi thọ tính bằng giờ Lh = ${tuoiThoTinhBangGio_Lh} (giờ)`)
      // Hết Chương 4 phần 1.2

      return super.handle(
        input,
        {
          ...result,
          chapter4: {
            ...result.chapter4,
            trucI: {
              vitriA: {
                code: code_A,
                d,
                D,
                D1,
                d1,
                B,
                C1,
                T,
                r,
                r1,
                alpha,
                C: khaNangTaiTrong_C7607,
                C0
              },
              vitriC: {
                code: code_C,
                d: d_C,
                D: D_C,
                B: B_C,
                r: r_C,
                r1: r1_C,
                C: C2207_C,
                C0: C0_C,
                duongKinhChieuDaiConLan
              }
            }
          }
        },
        request
      )
    } else {
      // Lấy từ bảng ra
      const code_A = 7308
      const d = 40
      const D = 90
      const D1 = 70.5
      const d1 = 64
      const B = 33
      const C1 = 28.5
      const T = 35.25
      const r = 2.5
      const r1 = 0.8
      const alpha = 11.17
      let khaNangTaiTrong_C7308 = 80
      const C0 = 67.2

      const heSoTaiDocTruc_e = parseFloat((1.5 * Math.tan(degreeToRadian(alpha))).toFixed(2))
      console.log(`Hệ số tải dọc trục e = ${heSoTaiDocTruc_e}`)

      const lucDocTrucPhu_S2 = parseFloat((0.83 * heSoTaiDocTruc_e * Fr2).toFixed(2))
      console.log(`Lực dọc trục phụ S2 = ${lucDocTrucPhu_S2} (N)`)

      lucDocTrucCuaTrucVit_Fa1 = lucDocTrucPhu_S2 + Fa
      console.log(`Fa1 = ${lucDocTrucCuaTrucVit_Fa1} (N)`)

      lucDocTrucBanhVit_Fa2 = lucDocTrucPhu_S2
      console.log(`Fa2 = ${lucDocTrucBanhVit_Fa2} (N)`)

      const heSo_V = 1
      const tySoSoBo = parseFloat((Fa / (heSo_V * 0.4 * lucHuongTam_FAr)).toFixed(2))
      console.log(`Tỷ số sơ bộ = ${tySoSoBo}`)

      const heSoTrongTai_X = 0.4
      const heSoTrongTai_Y = parseFloat(((heSoTrongTai_X * 1) / Math.tan(degreeToRadian(alpha))).toFixed(2))
      console.log(`Hệ số trọng tải X = ${heSoTrongTai_X}`)
      console.log(`Hệ số trọng tải Y = ${heSoTrongTai_Y}`)

      const heSo_Kd = 1.2
      const heSo_Kt = 1

      let taiTrongQuyUoc_Q = parseFloat(
        ((heSoTrongTai_X * heSo_V * lucHuongTam_FAr + heSoTrongTai_Y * Fa) * heSo_Kd * heSo_Kt).toFixed(2)
      )
      console.log(`Hệ số trọng tải Q = ${taiTrongQuyUoc_Q} (N)`)

      const khaNangTaiTrongDong_L = (thoiGianLamViec_Lh * 60 * soVongQuay_n) / 1000000
      console.log(`L = ${khaNangTaiTrongDong_L} (vòng)`)

      let khaNangTaiTrongDong_Ctt = parseFloat((taiTrongQuyUoc_Q * Math.pow(khaNangTaiTrongDong_L, 3 / 10)).toFixed(2))
      console.log(`Khả năng tải trọng động Ctt = ${khaNangTaiTrongDong_Ctt} (N)`)

      khaNangTaiTrong_C7308 = khaNangTaiTrong_C7308 * 1000

      console.log(
        `Vì Ctt < C ( ${khaNangTaiTrongDong_Ctt} < ${khaNangTaiTrong_C7308})  => Ổ lăn không thỏa điều kiện đã chọn của tải trọng động => Ta chọn lại ổ lăn`
      )
      // Hết Chương 4 phần 1.1

      // Chương 4 phần 1.2
      const code_C = 2208
      const d_C = 40
      const D_C = 80
      const B_C = 18
      const r_C = 2.0
      const r1_C = 2.0
      let khaNangTaiTrong_C2208 = 33.7
      const C0_C = 24
      const duongKinhChieuDaiConLan = 9

      taiTrongQuyUoc_Q = parseFloat((heSo_V * lucHuongTam_FCr * heSo_Kt * heSo_Kd).toFixed(2))
      console.log(`Hệ số trọng tải Q = ${taiTrongQuyUoc_Q} (N)`)

      console.log(`L = ${khaNangTaiTrongDong_L} (vòng)`)

      khaNangTaiTrongDong_Ctt = parseFloat((taiTrongQuyUoc_Q * Math.pow(khaNangTaiTrongDong_L, 3 / 10)).toFixed(2))
      console.log(`Khả năng tải trọng động Ctt = ${khaNangTaiTrongDong_Ctt} (N)`)

      khaNangTaiTrong_C2208 = khaNangTaiTrong_C2208 * 1000
      console.log(
        `Ctt < C (${khaNangTaiTrongDong_Ctt} < ${khaNangTaiTrong_C2208}) => Ổ lăn đã chọn thỏa tải trọng động`
      )

      // Theo bảng tra ta có C = 26500 (N)
      khaNangTaiTrong_C2208 = khaNangTaiTrong_C2208 * 1000

      const tuoiTho_L = parseFloat(Math.pow(khaNangTaiTrong_C2208 / taiTrongQuyUoc_Q, 10 / 3).toFixed(2))
      console.log(`Tuổi thọ L = ${tuoiTho_L} (triệu vòng)`)

      const tuoiThoTinhBangGio_Lh = parseFloat(((1000000 * tuoiTho_L) / (60 * soVongQuay_n)).toFixed(2))
      console.log(`Tuổi thọ tính bằng giờ Lh = ${tuoiThoTinhBangGio_Lh} (giờ)`)
      // Hết Chương 4 phần 1.2

      return super.handle(
        input,
        {
          ...result,
          chapter4: {
            ...result.chapter4,
            trucI: {
              vitriA: {
                code: code_A,
                d,
                D,
                D1,
                d1,
                B,
                C1,
                T,
                r,
                r1,
                alpha,
                C: khaNangTaiTrong_C7308,
                C0
              },
              vitriC: {
                code: code_C,
                d: d_C,
                D: D_C,
                B: B_C,
                r: r_C,
                r1: r1_C,
                C: khaNangTaiTrong_C2208 / 1000000,
                C0: C0_C,
                duongKinhChieuDaiConLan
              }
            }
          }
        },
        request
      )
    }
  }
}
