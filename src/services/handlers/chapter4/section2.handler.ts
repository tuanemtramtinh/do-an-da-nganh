import { AbstractHandler } from '../abstract.handler'

export class Chapter4Section2Handler extends AbstractHandler {
  public handle(input: any, result: any, request: string = ''): any | null {
    function degreeToRadian(degrees: number): number {
      return degrees * (Math.PI / 180)
    }

    const chapter1 = result.chapter1
    const chapter2 = result.chapter2
    const chapter3 = result.chapter3

    const heSo_V = 1
    const heSoTrongTai_X = 0.4
    const heSo_Kd = 1.2
    const heSo_Kt = 1

    // Chương 4 phần 2
    // Truc II

    const soVongQuay_n2 = chapter1.n_II
    const thoiGianLamViec_Lh2 = 4000

    const RDx = chapter3.RDx //5.2 chuong 3
    const RDy = chapter3.RDy //5.2 chuong 3

    const lucHuongTam_FDr = parseFloat(Math.sqrt(RDx ** 2 + RDy ** 2).toFixed(2))
    console.log(`Lực hướng tâm F_Dr = ${lucHuongTam_FDr} (N)`)

    const RGx = chapter3.RGx //5.2 chuong 3
    const RGy = chapter3.RGy //5.2 chuong 3

    const lucHuongTam_FGr = parseFloat(Math.sqrt(RGx ** 2 + RGy ** 2).toFixed(2))
    console.log(`Lực hướng tâm F_Gr = ${lucHuongTam_FGr} (N)`)

    const lucDocTrucBanhVit_Fa2 = chapter2.sizeOfTranmission.Ft1 // 2.12 chuong 2
    const Fa = lucDocTrucBanhVit_Fa2
    console.log(`Fa = ${Fa} (N)`)

    let duongKinhNgongTruc_d2

    if (input.F !== 17000) {
      duongKinhNgongTruc_d2 = 60
    } else {
      duongKinhNgongTruc_d2 = 70
    }

    if (duongKinhNgongTruc_d2 === 60) {
      // Lấy từ bảng ra
      const code = 7212
      const d2 = 60
      const D2 = 110
      const D1_2 = 94
      const d1_2 = 83
      const B2 = 22
      const C1_2 = 19
      const T2 = 23.75
      const r2 = 2.5
      const r1_2 = 0.8
      const alpha_2 = 13.17
      let khaNangTaiTrong_C7212 = 72.2
      const C0_2 = 58.4

      const heSoTaiDocTruc_e2 = parseFloat((1.5 * Math.tan(degreeToRadian(alpha_2))).toFixed(2))
      console.log(`Hệ số tải dọc trục e = ${heSoTaiDocTruc_e2}`)

      const lucDocTrucPhu_S1_2 = parseFloat((0.83 * heSoTaiDocTruc_e2 * lucHuongTam_FDr).toFixed(2))
      console.log(`Lực dọc trục phụ S2 = ${lucDocTrucPhu_S1_2} (N)`)

      const lucDocTrucPhu_S2_2 = parseFloat((0.83 * heSoTaiDocTruc_e2 * lucHuongTam_FGr).toFixed(2))
      console.log(`Lực dọc trục phụ S2 = ${lucDocTrucPhu_S2_2} (N)`)

      const lucDocTrucCuaTrucVit_Fa1_2 = lucDocTrucPhu_S1_2
      console.log(`Fa1 = ${lucDocTrucCuaTrucVit_Fa1_2} (N)`)

      const lucDocTrucBanhVit_Fa2_2 = lucDocTrucPhu_S1_2 + Fa
      console.log(`Fa2 = ${lucDocTrucBanhVit_Fa2_2} (N)`)

      const tySoSoBo_2 = parseFloat((lucDocTrucBanhVit_Fa2_2 / (heSo_V * lucHuongTam_FGr)).toFixed(2))
      console.log(`Tỷ số sơ bộ = ${tySoSoBo_2}`)

      const heSoTrongTai_Y2 = parseFloat(((heSoTrongTai_X * 1) / Math.tan(degreeToRadian(alpha_2))).toFixed(2))
      console.log(`Hệ số trọng tải X = ${heSoTrongTai_X}`)
      console.log(`Hệ số trọng tải Y = ${heSoTrongTai_Y2}`)

      const taiTrongQuyUoc_Q2 = parseFloat(
        (
          (heSoTrongTai_X * heSo_V * lucHuongTam_FGr + heSoTrongTai_Y2 * lucDocTrucBanhVit_Fa2_2) *
          heSo_Kd *
          heSo_Kt
        ).toFixed(2)
      )
      console.log(`Hệ số trọng tải Q = ${taiTrongQuyUoc_Q2} (N)`)

      const khaNangTaiTrongDong_L2 = parseFloat(((thoiGianLamViec_Lh2 * 60 * soVongQuay_n2) / 1000000).toFixed(2))
      console.log(`L = ${khaNangTaiTrongDong_L2} (vòng)`)

      const khaNangTaiTrongDong_Ctt2 = parseFloat(
        (taiTrongQuyUoc_Q2 * Math.pow(khaNangTaiTrongDong_L2, 3 / 10)).toFixed(1)
      )
      console.log(`Khả năng tải trọng động Ctt = ${khaNangTaiTrongDong_Ctt2} (N)`)

      khaNangTaiTrong_C7212 = khaNangTaiTrong_C7212 * 1000

      console.log(`Vì Ctt < C (43880.5 < ${khaNangTaiTrong_C7212})  => Ổ lăn thỏa điều kiện đã chọn của tải trọng động`)

      const tuoiTho_L2 = parseFloat(Math.pow(khaNangTaiTrong_C7212 / taiTrongQuyUoc_Q2, 10 / 3).toFixed(2))
      console.log(`Tuổi thọ L = ${tuoiTho_L2} (triệu vòng)`)

      const tuoiThoTinhBangGio_Lh2 = parseFloat(((1000000 * tuoiTho_L2) / (60 * soVongQuay_n2)).toFixed(2))
      console.log(`Tuổi thọ tính bằng giờ Lh = ${tuoiThoTinhBangGio_Lh2} (giờ)`)

      // Hết Chương 4 phần 2

      return super.handle(
        input,
        {
          ...result,
          chapter4: {
            ...result.chapter4,
            trucII: {
              code,
              d2,
              D2,
              D1_2,
              d1_2,
              B2,
              C1_2,
              T2,
              r2,
              r1_2,
              alpha_2,
              C: khaNangTaiTrong_C7212 / 1000,
              C0: C0_2
            }
          }
        },
        request
      )
    } else {
      // Chương 4 phần 2
      // Truc II
      // Lấy từ bảng ra
      const code = 7214
      const d2 = 70
      const D2 = 125
      const D1_2 = 107
      const d1_2 = 96
      const B2 = 24
      const C1_2 = 21
      const T2 = 26.25
      const r2 = 2.5
      const r1_2 = 0.8
      const alpha_2 = 13.83
      let khaNangTaiTrong_C7214 = 95.9
      const C0_2 = 82.1

      const heSoTaiDocTruc_e2 = parseFloat((1.5 * Math.tan(degreeToRadian(alpha_2))).toFixed(2))
      console.log(`Hệ số tải dọc trục e = ${heSoTaiDocTruc_e2}`)

      const lucDocTrucPhu_S1_2 = parseFloat((0.83 * heSoTaiDocTruc_e2 * lucHuongTam_FDr).toFixed(2))
      console.log(`Lực dọc trục phụ S1 = ${lucDocTrucPhu_S1_2} (N)`)

      const lucDocTrucPhu_S2_2 = parseFloat((0.83 * heSoTaiDocTruc_e2 * lucHuongTam_FGr).toFixed(2))
      console.log(`Lực dọc trục phụ S2 = ${lucDocTrucPhu_S2_2} (N)`)

      const lucDocTrucCuaTrucVit_Fa1_2 = lucDocTrucPhu_S1_2
      console.log(`Fa1 = ${lucDocTrucCuaTrucVit_Fa1_2} (N)`)

      const lucDocTrucBanhVit_Fa2_2 = lucDocTrucPhu_S1_2 + Fa
      console.log(`Fa2 = ${lucDocTrucBanhVit_Fa2_2} (N)`)

      const tySoSoBo_2 = parseFloat((lucDocTrucBanhVit_Fa2_2 / (heSo_V * lucHuongTam_FGr)).toFixed(2))
      console.log(`Tỷ số sơ bộ = ${tySoSoBo_2}`)

      const heSoTrongTai_Y2 = parseFloat(((heSoTrongTai_X * 1) / Math.tan(degreeToRadian(alpha_2))).toFixed(2))
      console.log(`Hệ số trọng tải X = ${heSoTrongTai_X}`)
      console.log(`Hệ số trọng tải Y = ${heSoTrongTai_Y2}`)

      const taiTrongQuyUoc_Q2 = parseFloat(
        (
          (heSoTrongTai_X * heSo_V * lucHuongTam_FGr + heSoTrongTai_Y2 * lucDocTrucBanhVit_Fa2_2) *
          heSo_Kd *
          heSo_Kt
        ).toFixed(2)
      )
      console.log(`Hệ số trọng tải Q = ${taiTrongQuyUoc_Q2} (N)`)

      const khaNangTaiTrongDong_L2 = parseFloat(((thoiGianLamViec_Lh2 * 60 * soVongQuay_n2) / 1000000).toFixed(2))
      console.log(`L = ${khaNangTaiTrongDong_L2} (vòng)`)

      const khaNangTaiTrongDong_Ctt2 = parseFloat(
        (taiTrongQuyUoc_Q2 * Math.pow(khaNangTaiTrongDong_L2, 3 / 10)).toFixed(1)
      )
      console.log(`Khả năng tải trọng động Ctt = ${khaNangTaiTrongDong_Ctt2} (N)`)

      khaNangTaiTrong_C7214 = khaNangTaiTrong_C7214 * 1000

      console.log(`Vì Ctt < C (43880.5 < ${khaNangTaiTrong_C7214})  => Ổ lăn thỏa điều kiện đã chọn của tải trọng động`)

      const tuoiTho_L2 = parseFloat(Math.pow(khaNangTaiTrong_C7214 / taiTrongQuyUoc_Q2, 10 / 3).toFixed(2))
      console.log(`Tuổi thọ L = ${tuoiTho_L2} (triệu vòng)`)

      const tuoiThoTinhBangGio_Lh2 = parseFloat(((1000000 * tuoiTho_L2) / (60 * soVongQuay_n2)).toFixed(2))
      console.log(`Tuổi thọ tính bằng giờ Lh = ${tuoiThoTinhBangGio_Lh2} (giờ)`)

      // Hết Chương 4 phần 2

      return super.handle(
        input,
        {
          ...result,
          chapter4: {
            ...result.chapter4,
            trucII: {
              code,
              d2,
              D2,
              D1_2,
              d1_2,
              B2,
              C1_2,
              T2,
              r2,
              r1_2,
              alpha_2,
              C: khaNangTaiTrong_C7214 / 1000,
              C0: C0_2
            }
          }
        },
        request
      )
    }
  }
}
