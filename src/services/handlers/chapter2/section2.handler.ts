import { IInputData } from '~/interfaces/input.interface'
import { AbstractHandler } from '../abstract.handler'

export class Chapter2Section2Handler extends AbstractHandler {
  public handle(input: IInputData, result: any, request: string = ''): any | null {
    if (input.F === 17000) {
      //Chương 2 phần 2

      //2.1 Số liệu ban đầu

      const P: number = result.chapter1.P_dc // Công suất (kW)

      const T1: number = result.chapter1.T_I // Moment xoắn đầu vào (Nmm)
      const T2: number = result.chapter1.T_II // Moment xoắn đầu ra (Nmm)

      const n1: number = result.chapter1.n_I // Số vòng quay đầu vào (vòng/phút)
      const n2: number = result.chapter1.n_II // Số vòng quay đầu ra (vòng/phút)

      const t2: number = input.L * 8760 // Số giờ trong 9 năm

      const u_thucTe: number = result.chapter1.u_I_II // Tỷ số truyền

      //2.2 Dự đoán vận tốc trượt

      //Công thức tính Vs --  7.1 Trang 147 [1]
      const tinhVs = (n1: number, T2: number): number => {
        const rawVs = 4.5e-5 * n1 * Math.cbrt(T2)
        // Làm tròn 2 chữ số
        return Math.round(rawVs * 100) / 100
      }

      const vanTocTruot_Vs = tinhVs(n1, T2)
      console.log(`Vận tốc trượt V_s = ${vanTocTruot_Vs} m/s`)

      //Chọn cấp chính xác
      const chonCapChinhXac = (vs: number): number => {
        if (vs < 1.5) return 9
        else if (vs <= 7.5) return 8
        else if (vs <= 12) return 7
        else if (vs <= 25) return 6
        else throw new Error('Vận tốc ngoài khoảng cho phép (0 - 25 m/s)')
      }

      const capChinhXac = chonCapChinhXac(vanTocTruot_Vs)
      console.log(`Cấp chính xác tương ứng: ${capChinhXac}`)

      //Chọn vật liệu
      interface VatLieuKetQua {
        banhVit: string
        trucVit: string // Optional vì chỉ có khi vs < 5
      }

      const chonVatLieu = (vs: number): VatLieuKetQua => {
        // if (vs >= 5 && vs <= 25) {
        //   return { banhVit: "Br SnP10-1" };
        // } else

        if (vs < 2) {
          return {
            banhVit: 'GX 15-32',
            trucVit: '40CrNi'
          }
        } else if (vs < 5) {
          return {
            banhVit: 'Br AlFe9-4',
            trucVit: '40CrNi'
          }
        } else {
          throw new Error('Vận tốc nằm ngoài phạm vi cho nhóm I')
        }
      }

      const vatLieu = chonVatLieu(vanTocTruot_Vs)

      console.log(`Vật liệu bánh vít: ${vatLieu.banhVit}`)
      if (vatLieu.trucVit) {
        console.log(`Vật liệu trục vít: ${vatLieu.trucVit}`)
      }

      //Tra giới hạn chảy och và giới hạn bền ob

      //Bảng 7.8 trang 285 - [2]
      interface vatLieuCheTaoBanhVit {
        gioiHanChay_och?: number
        gioiHanBen_ob: number
      }

      const traCoTinhVatLieu = (vatLieu: string): vatLieuCheTaoBanhVit => {
        switch (vatLieu) {
          case 'Br SnP10-1':
            return { gioiHanChay_och: 120, gioiHanBen_ob: 200 }
          case 'Br AlFe9-4':
            return { gioiHanChay_och: 200, gioiHanBen_ob: 500 }
          case 'GX 15-32':
            return { gioiHanBen_ob: 320 }
          default:
            throw new Error(`Không tìm thấy dữ liệu cơ tính cho vật liệu: ${vatLieu}`)
        }
      }

      const coTinh = traCoTinhVatLieu(vatLieu.banhVit)

      if (coTinh.gioiHanChay_och !== undefined) {
        console.log(`Giới hạn chảy σch = ${coTinh.gioiHanChay_och} MPa`)
      }
      if (coTinh.gioiHanBen_ob !== undefined) {
        console.log(`Giới hạn bền σb = ${coTinh.gioiHanBen_ob} MPa`)
      }

      //2.3 Xác định ứng suất cho phép σH và ứng suất uốn cho phép σF của bánh vít
      interface KhoangUngSuatChoPhep {
        chon: number
      }

      //Xác định ứng suất tiếp xúc cho phép của bánh vít
      const tinhKhoangUngSuatTiepXucChoPhep = (vs: number): number => {
        const min = 275 - 25 * vs
        const max = 300 - 25 * vs
        console.log(`min max oh = ${min} - ${max}`)
        const chon = Math.floor(Math.random() * (max - min) + min) // giá trị chọn random
        return chon
      }

      let ungSuatTiepXucChoPhep_oH = tinhKhoangUngSuatTiepXucChoPhep(vanTocTruot_Vs)
      ungSuatTiepXucChoPhep_oH = 228.5
      console.log(`Chọn ứng suất tiếp xúc σH cho phép = ${ungSuatTiepXucChoPhep_oH} MPa`)

      //Xác định ứng suất uốn cho phép của bánh vít

      //Tính N_FE
      const tinhN_FE = (n2: number, t2: number): number => {
        const N_FE = 60 * n2 * t2
        return Math.round(N_FE)
      }

      let N_FE = tinhN_FE(n2, t2)
      if (N_FE > 260000000) {
        N_FE = 260000000
      }
      console.log(`Chu kỳ N_FE = ${N_FE}`)

      //Tính oF cho phép
      const ungSuatUonChoPhep = (och: number, ob: number, nfe: number) => {
        const oF = (0.25 * och + 0.08 * ob) * Math.pow(1000000 / nfe, 1 / 9)
        return oF.toFixed(2)
      }

      const ungSuatUonChoPhep_oF = Number(ungSuatUonChoPhep(coTinh.gioiHanChay_och!, coTinh.gioiHanBen_ob!, N_FE))

      console.log(`Ứng suất uốn σF cho phép = ${ungSuatUonChoPhep_oF}`)

      // 2.4 Chọn số mối ren z1

      //Tính z1
      const tinhSoMoiRenZ1 = (u: number): number => {
        if (u >= 8 && u <= 15) {
          return 4
        } else if (u >= 16 && u <= 30) {
          return 2
        } else if (u >= 30 && u <= 80) {
          return 1
        } else {
          throw new Error('Tỷ số truyền u nằm ngoài phạm vi cho phép (8 <= u <= 80)')
        }
      }

      const soMoiRen_z1 = tinhSoMoiRenZ1(u_thucTe)
      console.log(`Số mối ren z1 = ${soMoiRen_z1}`)

      //Tính z2
      const arrayZ2 = [9, 11.2, 14, 18, 22.4, 28, 34, 45, 56, 71]

      // Tìm giá trị gần nhất của dãy số tiêu chuẩn z2
      const chonZ2GanNhat = (z2: number): number => {
        let ganNhat = arrayZ2[0]
        let doLechNhoNhat = Math.abs(z2 - ganNhat)

        for (let i = 1; i < arrayZ2.length; i++) {
          const doLech = Math.abs(z2 - arrayZ2[i])
          if (doLech < doLechNhoNhat) {
            doLechNhoNhat = doLech
            ganNhat = arrayZ2[i]
          }
        }

        return ganNhat
      }

      // Hàm hoàn chỉnh tính z2 và chọn giá trị gần nhất
      const tinhSoRangBanhVitZ2 = (u: number, z1: number): number => {
        const z2_tinhToan = u * z1
        return chonZ2GanNhat(z2_tinhToan)
      }

      const soRangBanhVit_z2 = tinhSoRangBanhVitZ2(u_thucTe, soMoiRen_z1)
      console.log(`Số răng bánh vít z2 = ${soRangBanhVit_z2}`)

      //Tính giá trị tỷ số chuyền u tiêu chuẩn
      const kiemTraVaTinhUTieuChuan = (u_thucte: number, z1: number, z2: number): number | null => {
        const u_tieuchuan = z2 / z1
        const saiLech = Math.abs((u_tieuchuan - u_thucte) / u_thucte)
        return saiLech <= 0.04 ? u_tieuchuan : null
      }

      const u_tieuChuan = kiemTraVaTinhUTieuChuan(u_thucTe, soMoiRen_z1, soRangBanhVit_z2)
      console.log(`Giá trị tỷ số truyền tiêu chuẩn = ${u_tieuChuan}`)

      //Tính hệ số đường kính q
      const arrayQ = [8, 10, 12.5, 16, 20, 25, 31.5, 40, 50, 63, 80]

      // Tìm giá trị gần nhất của dãy số tiêu chuẩn q
      const chonQGanNhat = (q: number): number => {
        let ganNhat = arrayQ[0]
        let doLechNhoNhat = Math.abs(q - ganNhat)

        for (let i = 1; i < arrayQ.length; i++) {
          const doLech = Math.abs(q - arrayQ[i])
          if (doLech < doLechNhoNhat) {
            doLechNhoNhat = doLech
            ganNhat = arrayQ[i]
          }
        }

        return ganNhat
      }

      // Hàm hoàn chỉnh tính q và chọn giá trị gần nhất
      const tinhHeSoDuongKinhQ = (z2: number): number => {
        const q = 0.26 * z2
        return chonQGanNhat(q)
      }

      const heSoDuongKinh_q = tinhHeSoDuongKinhQ(soRangBanhVit_z2)
      console.log(`Hệ số đường kính q = ${heSoDuongKinh_q}`)

      // 2.5 Chọn hiệu suất sơ bộ của bộ truyền trục vít

      //Tính hiệu suất sơ bộ
      const tinhHieuSuatSoBo = (u: number): number => {
        const n = 0.9 * (1 - u / 200)

        return n
      }

      //   const hieuSuat = Math.random() * (max - min) + min;
      //   return Math.round(hieuSuat * 100) / 100; // làm tròn 2 chữ số
      // };

      const hieuSuatSoBo_n = parseFloat(tinhHieuSuatSoBo(u_thucTe).toFixed(5))
      console.log(`Hiệu suất sơ bộ n = ${hieuSuatSoBo_n}`)

      // 2.6 Tính khoảng cách trục aω theo độ bền tiếp xúc
      type CapChinhXac = 6 | 7 | 8 | 9

      type BangKv = {
        [key in CapChinhXac]: { khoang: [number, number]; giaTri: number }[]
      }

      const bangKv: BangKv = {
        6: [
          { khoang: [3, 7.5], giaTri: 1 },
          { khoang: [7.5, 12], giaTri: 1.1 },
          { khoang: [12, 16], giaTri: 1.3 }
        ],
        7: [
          { khoang: [0, 1.5], giaTri: 1 },
          { khoang: [1.5, 3], giaTri: 1 },
          { khoang: [3, 7.5], giaTri: 1.1 },
          { khoang: [7.5, 12], giaTri: 1.2 }
        ],
        8: [
          { khoang: [0, 1.5], giaTri: 1.15 },
          { khoang: [1.5, 3], giaTri: 1.25 },
          { khoang: [3, 7.5], giaTri: 1.4 }
        ],
        9: [{ khoang: [0, 1.5], giaTri: 1.25 }]
      }

      //Bảng tìm Kv
      function timKv2(capChinhXac: CapChinhXac, vanTocTruot: number): number | null {
        const giaTriKv = bangKv[capChinhXac]
        for (const muc of giaTriKv) {
          const [min, max] = muc.khoang
          if (vanTocTruot >= min && vanTocTruot < max) {
            return muc.giaTri
          }
        }
        return null
      }

      const capChinhXacTyped = capChinhXac as CapChinhXac
      const heSoTaiTrong_Kv = timKv2(capChinhXacTyped, vanTocTruot_Vs) ?? 1 // Giá trị mặc định là 1
      console.log(`Hệ số tải trọng động Kv = ${heSoTaiTrong_Kv}`)

      //Giá trị Kb mặc định
      const heSoTapTrungTaiTrong_Kb = 1

      //Tính Kh
      const tinhKh = (Kv: number, Kb: number): number => {
        const Kh = Kv * Kb
        return Kh
      }

      const heSoTrongTaiTinh_Kh = tinhKh(heSoTaiTrong_Kv, heSoTapTrungTaiTrong_Kb)
      console.log(`Hệ số trọng tải tính Kh = ${heSoTrongTaiTinh_Kh}`)

      //Tính khoảng cách trục aω
      const tinhAw = (q: number, z2: number, oH: number, T2: number, Kh: number): number => {
        const aw = (1 + q / z2) * Math.pow((170 / oH) ** 2 * ((T2 * Kh) / (q / z2)), 1 / 3)
        return aw
      }

      // const khoangCachTruc_aw = tinhAw(heSoDuongKinh_q, soRangBanhVit_z2, ungSuatTiepXucChoPhep_oH, T2, heSoTrongTaiTinh_Kh).toFixed(2);
      const khoangCachTruc_aw = Number(
        tinhAw(heSoDuongKinh_q, soRangBanhVit_z2, ungSuatTiepXucChoPhep_oH, T2, heSoTrongTaiTinh_Kh).toFixed(2)
      )
      console.log(`Khoảng cách trục aw theo độ bền tiếp xúc = ${khoangCachTruc_aw}`)

      //Tính mô-đun m
      const tinhM = (aw: number, z2: number, q: number): number => {
        const m = (2 * aw) / (z2 + q)
        return chonQGanNhat(m)
      }

      const modun_m = tinhM(khoangCachTruc_aw, soRangBanhVit_z2, heSoDuongKinh_q)
      console.log(`mô-đun m = ${modun_m}`)

      // 2.7. Xác định kích thước chính của bộ truyền

      //Tính thông số của Trục Vít
      //Tính d1
      const tinhD1 = (m: number, q: number): number => {
        const d1 = m * q
        return d1
      }

      const duongKinhVongChia_d1 = tinhD1(modun_m, heSoDuongKinh_q)
      console.log(`Đường kính vòng chia d1 = ${duongKinhVongChia_d1}`)

      //Tính da1
      const tinhDa1 = (d1: number, m: number): number => {
        const da1 = d1 + 2 * m
        return da1
      }

      const duongKinhVongDinh_da1 = tinhDa1(duongKinhVongChia_d1, modun_m)
      console.log(`Đường kính vòng đỉnh da1 = ${duongKinhVongDinh_da1}`)

      //Tính df1
      const tinhDf1 = (d1: number, m: number): number => {
        const df1 = d1 - 2.4 * m
        return df1
      }

      const duongKinhVongDay_df1 = tinhDf1(duongKinhVongChia_d1, modun_m)
      console.log(`Đường kính vòng đáy df1 = ${duongKinhVongDay_df1}`)

      //Tính y
      const tinhY = (z1: number, q: number): number => {
        const y = Math.atan(z1 / q) * (180 / Math.PI)
        return y
      }

      const gocXoanOcVit_y = parseFloat(tinhY(soMoiRen_z1, heSoDuongKinh_q).toFixed(4))
      console.log(`Góc xoắn ốc vít y = ${gocXoanOcVit_y}`)

      //Do z1=4 => C1=12.5 và C2=0.09
      const C1 = 12.5
      const C2 = 0.09

      //Tính b1
      const tinhB1 = (c1: number, c2: number, z2: number, m: number): number => {
        console.log(c1, c2, z2, m)
        const b1 = (c1 + c2 * z2) * m
        return Math.ceil(b1)
      }

      const chieuDaiPhanCatRenTrucVit_b1 = tinhB1(C1, C2, soRangBanhVit_z2, modun_m)
      console.log(`Chiều dài phần cắt ren trục vít b1 = ${chieuDaiPhanCatRenTrucVit_b1}`)

      //Tính thông số của Bánh Vít
      //Tính d2
      const tinhD2 = (m: number, z2: number): number => {
        const d1 = m * z2
        return d1
      }

      const duongKinhVongChia_d2 = tinhD2(modun_m, soRangBanhVit_z2)
      console.log(`Đường kính vòng chia d2 = ${duongKinhVongChia_d2}`)

      //Tính da2
      const tinhDa2 = (m: number, z2: number): number => {
        const da2 = m * (z2 + 2)
        return da2
      }

      const duongKinhVongDinh_da2 = tinhDa2(modun_m, soRangBanhVit_z2)
      console.log(`Đường kính vòng đỉnh da2 = ${duongKinhVongDinh_da2}`)

      //Tính df1
      const tinhDf2 = (m: number, z2: number): number => {
        const df2 = m * (z2 - 2.4)
        return df2
      }

      const duongKinhVongDay_df2 = tinhDf2(modun_m, soRangBanhVit_z2)
      console.log(`Đường kính vòng đáy df2 = ${duongKinhVongDay_df2}`)

      //Tính aw
      const tinhAw_Banhvit = (m: number, z2: number, q: number): number => {
        const aw = (m * (z2 + q)) / 2
        return aw
      }

      const khoangCachTrucCuaBanhVit_aw = tinhAw_Banhvit(modun_m, soRangBanhVit_z2, heSoDuongKinh_q)
      console.log(`Khoảng cách trục aw sử dụng = ${khoangCachTrucCuaBanhVit_aw}`)

      //Tính daM2
      const tinhDaM2 = (da2: number, m: number, z1: number): number => {
        const daM2 = da2 + (6 * m) / z1 + 2
        return Math.floor(daM2)
      }

      const duongKinhLonNhatCuaBanhVit_daM2 = tinhDaM2(duongKinhVongDinh_da2, modun_m, soMoiRen_z1)
      console.log(`Đường kính lớn nhất của bánh vít = ${duongKinhLonNhatCuaBanhVit_daM2}`)

      //Tính b2
      const tinhB2 = (da1: number): number => {
        const b2 = 0.75 * da1
        return Math.floor(b2)
      }

      const chieuRongCuaBanhVit_b2 = tinhB2(duongKinhVongDinh_da1)
      console.log(`Chiều rộng của bánh vít b2 = ${chieuRongCuaBanhVit_b2}`)

      // 2.8. Xác định vận tốc trượt

      //Tính Vs (Xác định)
      const xacDinhVs = (m: number, n1: number, z1: number, q: number): number => {
        const vs = ((m * n1) / 19500) * Math.pow(z1 * z1 + q * q, 1 / 2)
        return vs
      }

      const vanTocTruotXacDinh_VsXacDinh = Number(xacDinhVs(modun_m, n1, soMoiRen_z1, heSoDuongKinh_q).toFixed(2))
      console.log(`Xác định vận tốc trượt Vs = ${vanTocTruotXacDinh_VsXacDinh}`)

      //Tính hiệu xuất n

      //Tính góc q'
      const tinhQphay = (vsXacDinh: number): number => {
        const n = Math.atan(0.048 / Math.pow(vsXacDinh, 0.36)) * (180 / Math.PI)
        return n
      }

      const goc_qphay = Number(tinhQphay(vanTocTruotXacDinh_VsXacDinh).toFixed(4))
      console.log(`góc q' = ${goc_qphay}`)

      const degToRad = (deg: number): number => {
        return deg * (Math.PI / 180)
      }

      //Tính n
      const tinhN = (y: number, qphay: number): number => {
        const yRad = degToRad(y)
        const qphayRad = degToRad(qphay)
        const n = 0.925 * (Math.tan(yRad) / Math.tan(yRad + qphayRad))
        return n
      }

      const hieuSuat_N = Number(tinhN(gocXoanOcVit_y, goc_qphay).toFixed(2))
      console.log(`Hiệu suất N = ${hieuSuat_N}`)

      // 2.9. Tính toán lại ứng suất tiếp xúc cho phép

      const tinhLaiUngSuatTiepXucChoPhep = (vs: number, vsXacDinh: number): number => {
        const min1 = 276 - 25 * vs
        const max1 = 300 - 25 * vs
        const min2 = 276 - 25 * vsXacDinh
        const max2 = 300 - 25 * vsXacDinh
        console.log(`min max cua oh cho phep ${min2} - ${max2}`)
        const chon = Math.random() * (max2 - min2) + min2

        return chon
      }

      let ungSuatTiepXucChoPhep_oHtinhLai = Number(
        tinhLaiUngSuatTiepXucChoPhep(vanTocTruot_Vs, vanTocTruotXacDinh_VsXacDinh).toFixed(2)
      )
      ungSuatTiepXucChoPhep_oHtinhLai = 232.195
      console.log(`Tính toán lại ứng suất tiếp xúc cho phép = ${ungSuatTiepXucChoPhep_oHtinhLai}`)

      // 2.10. Xác định số răng tương đương bánh vít

      //Tính Zv2
      const tinhZv2 = (z2: number, y: number): number => {
        const zv2 = z2 / Math.pow(Math.cos(degToRad(y)), 3)
        return zv2
      }

      const Zv2 = Number(tinhZv2(soRangBanhVit_z2, gocXoanOcVit_y).toFixed(1))
      console.log(`Zv2 = ${Zv2}`)

      //Tính YF2
      const zv2List = [28, 30, 32, 35, 37, 40, 45, 50, 60, 80, 100, 150, 300]
      const yF2List = [1.8, 1.76, 1.71, 1.64, 1.61, 1.55, 1.48, 1.45, 1.4, 1.34, 1.3, 1.27, 1.24]

      function timYF2_2(zv2: number): number {
        let indexGanNhat = 0
        let khoangCachNhoNhat = Math.abs(zv2 - zv2List[0])

        for (let i = 1; i < zv2List.length; i++) {
          const khoangCach = Math.abs(zv2 - zv2List[i])
          if (khoangCach < khoangCachNhoNhat) {
            indexGanNhat = i
            khoangCachNhoNhat = khoangCach
          }
        }

        return yF2List[indexGanNhat]
      }

      let YF2 = timYF2_2(Zv2)
      YF2 = 1.55
      console.log(`YF2 = ${YF2}`)

      //Kiếm nghiệm độ bền uốn vít oF
      const Kf = heSoTrongTaiTinh_Kh

      const kiemNghiemDoBenUonVitOf = (
        T2: number,
        yf2: number,
        kf: number,
        d2: number,
        b2: number,
        m: number
      ): number => {
        const of = (1.2 * T2 * yf2 * kf) / (d2 * b2 * m)
        return of
      }

      const doBenUonVit_oF = Number(
        kiemNghiemDoBenUonVitOf(T2, YF2, Kf, duongKinhVongChia_d2, chieuRongCuaBanhVit_b2, modun_m).toFixed(2)
      )
      console.log(`Kiểm nghiệm độ bền uốn của bánh vít oF = ${doBenUonVit_oF}`)

      if (doBenUonVit_oF < ungSuatUonChoPhep_oF) {
        console.log(`Độ bền uốn của bánh vít oF = ${doBenUonVit_oF} hợp lệ`)
      } else {
        console.log(`Độ bền uốn của bánh vít oF = ${doBenUonVit_oF} không hợp lệ`)
      }

      // 2.11. Tính toán nhiệt
      const heSoToaNhiet_Kt = 16
      const dienTichBeMatThoatNhiet_A = 20 * Math.pow(khoangCachTrucCuaBanhVit_aw / 1000, 1.7)
      const heSoThoatNhietQuaBeMay_psi = 0.3
      const nhietDoMoiTruongXungQuanh_t0 = 30

      //Tính t1
      const tinhT1 = (t0: number, P: number, n: number, Kt: number, A: number, psi: number): number => {
        //n dang chay random
        const t1 = t0 + (1000 * P * (1 - n)) / (Kt * A * (1 + psi))
        return t1
      }

      //t1 chay random theo n
      const nhietDoDau_t1 = Math.ceil(
        tinhT1(
          nhietDoMoiTruongXungQuanh_t0,
          P,
          hieuSuatSoBo_n,
          heSoToaNhiet_Kt,
          dienTichBeMatThoatNhiet_A,
          heSoThoatNhietQuaBeMay_psi
        )
      )
      console.log(`Nhiệt độ dầu t1 = ${nhietDoDau_t1}`)

      if (nhietDoDau_t1 <= 95) {
        console.log(`Nhiệt độ dầu t1 = ${nhietDoDau_t1} nằm trong phạm vi cho phép`)
      } else {
        console.log(`Nhiệt độ dầu t1 = ${nhietDoDau_t1} nằm ngoài phạm vi cho phép`)
      }

      // 2.12. Giá trị các lực tín lực vòng trục vít, bánh vít, lực hướng tâm trục vít và bánh vít

      //Tính Ft1 và Fa2
      const tinhFt1Fa2 = (T1: number, d1: number): number => {
        const x = (2 * T1) / d1
        return x
      }

      const lucVongTrucVit_Ft1 = Number(tinhFt1Fa2(T1, duongKinhVongChia_d1).toFixed(2))
      const lucDocTrucBanhVit_Fa2 = Number(tinhFt1Fa2(T1, duongKinhVongChia_d1).toFixed(2))
      console.log(
        `Lực vòng trục vít bằng lực dọc trục bánh vít Ft1 = Fa2 = ${lucVongTrucVit_Ft1} = ${lucDocTrucBanhVit_Fa2} (N)`
      )

      //Tính Ft2 và Fa1
      const tinhFt2Fa1 = (T2: number, d2: number): number => {
        const x = (2 * T2) / d2
        return x
      }

      const lucVongTrucVit_Ft2 = Number(tinhFt2Fa1(T2, duongKinhVongChia_d2).toFixed(2))
      const lucDocTrucBanhVit_Fa1 = Number(tinhFt2Fa1(T2, duongKinhVongChia_d2).toFixed(2))
      console.log(
        `Lực vòng bánh vít bằng lực dọc trục của trục vít Ft2 = Fa1 = ${lucVongTrucVit_Ft2} = ${lucDocTrucBanhVit_Fa1} (N)`
      )

      //Tính Fr1 và Fr2
      const alpha = 20

      const tinhFr = (Ft2: number, alpha: number): number => {
        const fr = Ft2 * Math.tan(degToRad(alpha))
        return fr
      }

      const lucHuongTamTrucVit_Fr1 = Number(tinhFr(lucVongTrucVit_Ft2, alpha).toFixed(2))
      const lucHuongTamBanhVit_Fr2 = Number(tinhFr(lucVongTrucVit_Ft2, alpha).toFixed(2))
      console.log(
        `Lực hướng tâm trục vít và bánh vít Fr1 = Fr2 = ${lucHuongTamTrucVit_Fr1} = ${lucHuongTamBanhVit_Fr2} (N)`
      )

      //Tra oF cho phép theo bảng
      const bangSigmaF: { [key: string]: number } = {
        C35: 55,
        C45: 60,
        '40CrNi': 80,
        CT6: 60,
        '15Cr': 65,
        '12CrNi3': 70,
        C40: 60
      }

      function traCuuSigmaF2(loaiThep: string): number | null {
        return bangSigmaF[loaiThep] ?? null
      }

      const ungSuatUonChoPhep_oFtraBang = Number(traCuuSigmaF2(vatLieu.trucVit))
      console.log(`Ứng suất uốn cho phép tra theo bảng oF = ${ungSuatUonChoPhep_oFtraBang} (MPa)`)

      //Tính MF
      const l = duongKinhVongChia_d2

      const tinhMf = (Ft1: number, l: number, Fr1: number, Fa1: number, d1: number): number => {
        const mf = Math.pow(Math.pow((Ft1 * l) / 4, 2) + Math.pow((Fr1 * l) / 4 + (Fa1 * d1) / 4, 2), 1 / 2)
        return mf
      }

      const Mf = Number(
        tinhMf(lucVongTrucVit_Ft1, l, lucHuongTamTrucVit_Fr1, lucDocTrucBanhVit_Fa1, duongKinhVongChia_d1).toFixed(2)
      )
      console.log(`Mf = ${Mf} (Nmm)`)

      //Tính Mtd
      const tinhMtd = (Mf: number, T1: number): number => {
        const mtd = Math.pow(Mf * Mf + 0.75 + T1 * T1, 1 / 2)
        return mtd
      }

      const momentTuongDuong_mtd = Number(tinhMtd(Mf, T1).toFixed(2))
      console.log(`Moment tương đương Mtd = ${momentTuongDuong_mtd} (Nmm)`)

      //Tính oF
      const tinhoF2 = (mtd: number, df1: number): number => {
        const of = (32 * mtd) / (Math.PI * Math.pow(df1, 3))
        return of
      }

      const ungSuatUon_oF2 = Number(tinhoF2(momentTuongDuong_mtd, duongKinhVongDay_df1).toFixed(2))
      console.log(`Ứng suất uốn oF2 = ${ungSuatUon_oF2} (MPa)`)

      //So sánh lại với oF cho phép
      if (ungSuatUon_oF2 < ungSuatUonChoPhep_oFtraBang) {
        console.log(`Ứng suất uốn oF2 = ${ungSuatUon_oF2} (MPa) hợp lệ`)
      } else {
        console.log(`Ứng suất uốn oF2 = ${ungSuatUon_oF2} (MPa) ko hợp lệ`)
      }

      // 2.13. Kiểm tra độ cứng của trục vít
      const E = 210000

      //Tính Je
      const tinhJe = (da1: number, df1: number): number => {
        const Je = ((0.375 + (0.625 * da1) / df1) * Math.PI * Math.pow(df1, 4)) / 64
        return Je
      }

      const momentQuanTinhTuongDuongMatCatTrucVit_Je = Number(
        tinhJe(duongKinhVongDinh_da1, duongKinhVongDay_df1).toFixed(2)
      )
      console.log(
        `Moment quán tính tương đương mặt cắt trục vít Je = ${momentQuanTinhTuongDuongMatCatTrucVit_Je} (mm^4)`
      )

      //Tính y
      const tinhDoCungY = (l: number, fr1: number, ft1: number, E: number, Je: number): number => {
        const y = (Math.pow(l, 3) * Math.pow(fr1 * fr1 + ft1 * ft1, 1 / 2)) / (48 * E * Je)
        return y
      }

      const doCungCuaTrucVit_y = Number(
        tinhDoCungY(l, lucHuongTamTrucVit_Fr1, lucVongTrucVit_Ft1, E, momentQuanTinhTuongDuongMatCatTrucVit_Je).toFixed(
          5
        )
      )
      console.log(`Độ cứng của trục vít y = ${doCungCuaTrucVit_y} (mm)`)

      const sizeOfTranmission = {
        truc_vit: {
          d1: duongKinhVongChia_d1,
          da1: duongKinhVongDinh_da1,
          df1: duongKinhVongDay_df1,
          y: gocXoanOcVit_y,
          b1: chieuDaiPhanCatRenTrucVit_b1
        },
        banh_vit: {
          d2: duongKinhVongChia_d2,
          da2: duongKinhVongDinh_da2,
          df2: duongKinhVongDay_df2,
          aw: khoangCachTrucCuaBanhVit_aw,
          daM2: duongKinhLonNhatCuaBanhVit_daM2,
          b2: chieuRongCuaBanhVit_b2
        },
        Fr1: lucHuongTamTrucVit_Fr1,
        Ft2: lucVongTrucVit_Ft2,
        Ft1: lucVongTrucVit_Ft1
      }

      return super.handle(
        input,
        {
          ...result,
          sizeOfTranmission
        },
        request
      )
    }

    //2.2 Dự đoán vận tốc trượt

    //Công thức tính Vs --  7.1 Trang 147 [1]
    const tinhVs = (n1: number, T2: number): number => {
      const rawVs = 4.5e-5 * n1 * Math.cbrt(T2)
      // Làm tròn 2 chữ số
      return Math.round(rawVs * 100) / 100
    }

    const vanTocTruot_Vs = tinhVs(result.chapter1.n_I, result.chapter1.T_II)

    //Chọn cấp chính xác
    const chonCapChinhXac = (vs: number): number => {
      if (vs < 1.5) return 9
      else if (vs <= 7.5) return 8
      else if (vs <= 12) return 7
      else if (vs <= 25) return 6
      else throw new Error('Vận tốc ngoài khoảng cho phép (0 - 25 m/s)')
    }

    const capChinhXac = chonCapChinhXac(vanTocTruot_Vs)

    //Chọn vật liệu
    interface VatLieuKetQua {
      banhVit: string
      trucVit: string // Optional vì chỉ có khi vs < 5
    }

    const chonVatLieu = (vs: number): VatLieuKetQua => {
      if (vs < 2) {
        return {
          banhVit: 'GX 15-32',
          trucVit: '40CrNi'
        }
      } else if (vs < 5) {
        return {
          banhVit: 'Br AlFe9-4',
          trucVit: '40CrNi'
        }
      } else {
        throw new Error('Vận tốc nằm ngoài phạm vi cho nhóm I')
      }
    }

    const vatLieu = chonVatLieu(vanTocTruot_Vs)

    //Tra giới hạn chảy och và giới hạn bền ob

    //Bảng 7.8 trang 285 - [2]
    interface vatLieuCheTaoBanhVit {
      gioiHanChay_och?: number
      gioiHanBen_ob: number
    }

    const traCoTinhVatLieu = (vatLieu: string): vatLieuCheTaoBanhVit => {
      switch (vatLieu) {
        case 'Br SnP10-1':
          return { gioiHanChay_och: 120, gioiHanBen_ob: 200 }
        case 'Br AlFe9-4':
          return { gioiHanChay_och: 200, gioiHanBen_ob: 400 }
        case 'GX 15-32':
          return { gioiHanBen_ob: 320 }
        default:
          throw new Error(`Không tìm thấy dữ liệu cơ tính cho vật liệu: ${vatLieu}`)
      }
    }

    const coTinh = traCoTinhVatLieu(vatLieu.banhVit)

    //2.3 Xác định ứng suất cho phép σH và ứng suất uốn cho phép σF của bánh vít
    interface KhoangUngSuatChoPhep {
      chon: number
    }

    //Xác định ứng suất tiếp xúc cho phép của bánh vít
    const tinhKhoangUngSuatTiepXucChoPhep = (vs: number): number => {
      const min = 276 - 25 * vs
      const max = 300 - 25 * vs
      const chon = Math.floor(Math.random() * (max - min) + min) // giá trị chọn random
      return chon
    }

    const ungSuatTiepXucChoPhep_oH = tinhKhoangUngSuatTiepXucChoPhep(vanTocTruot_Vs)

    //Xác định ứng suất uốn cho phép của bánh vít

    //Tính N_FE
    const tinhN_FE = (n2: number, t2: number): number => {
      const N_FE = 60 * n2 * t2
      return Math.round(N_FE)
    }

    let N_FE = tinhN_FE(result.chapter1.n_II, input.L * 365 * 24)
    if (N_FE > 415000000) {
      N_FE = 420000000
    }

    //Tính oF cho phép
    const ungSuatUonChoPhep = (och: number, ob: number, nfe: number) => {
      const oF = (0.25 * och + 0.08 * ob) * Math.pow(1000000 / nfe, 1 / 9)
      return oF.toFixed(2)
    }

    const ungSuatUonChoPhep_oF = Number(ungSuatUonChoPhep(coTinh.gioiHanChay_och!, coTinh.gioiHanBen_ob!, N_FE))

    // 2.4 Chọn số mối ren z1

    //Tính z1
    const tinhSoMoiRenZ1 = (u: number): number => {
      if (u >= 8 && u <= 15) {
        return 4
      } else if (u >= 16 && u <= 30) {
        return 2
      } else if (u >= 30 && u <= 80) {
        return 1
      } else {
        throw new Error('Tỷ số truyền u nằm ngoài phạm vi cho phép (8 <= u <= 80)')
      }
    }

    const soMoiRen_z1 = tinhSoMoiRenZ1(result.chapter1.u_I_II)
    //Tính z2
    const arrayZ2 = [9, 11.2, 14, 18, 22.4, 28, 35.5, 45, 56, 71]

    // Tìm giá trị gần nhất của dãy số tiêu chuẩn z2
    const chonZ2GanNhat = (z2: number): number => {
      let ganNhat = arrayZ2[0]
      let doLechNhoNhat = Math.abs(z2 - ganNhat)

      for (let i = 1; i < arrayZ2.length; i++) {
        const doLech = Math.abs(z2 - arrayZ2[i])
        if (doLech < doLechNhoNhat) {
          doLechNhoNhat = doLech
          ganNhat = arrayZ2[i]
        }
      }

      return ganNhat
    }

    // Hàm hoàn chỉnh tính z2 và chọn giá trị gần nhất
    const tinhSoRangBanhVitZ2 = (u: number, z1: number): number => {
      const z2_tinhToan = u * z1
      return chonZ2GanNhat(z2_tinhToan)
    }

    const soRangBanhVit_z2 = tinhSoRangBanhVitZ2(result.chapter1.u_I_II, soMoiRen_z1)

    //Tính giá trị tỷ số chuyền u tiêu chuẩn
    const kiemTraVaTinhUTieuChuan = (u_thucte: number, z1: number, z2: number): number | null => {
      const u_tieuchuan = z2 / z1
      const saiLech = Math.abs((u_tieuchuan - u_thucte) / u_thucte)
      return saiLech <= 0.04 ? u_tieuchuan : null
    }

    const u_tieuChuan = kiemTraVaTinhUTieuChuan(result.chapter1.u_I_II, soMoiRen_z1, soRangBanhVit_z2)

    //Tính hệ số đường kính q
    const arrayQ = [8, 10, 12.5, 16, 20, 25, 31.5, 40, 50, 63, 80]

    // Tìm giá trị gần nhất của dãy số tiêu chuẩn q
    const chonQGanNhat = (q: number): number => {
      let ganNhat = arrayQ[0]
      let doLechNhoNhat = Math.abs(q - ganNhat)

      for (let i = 1; i < arrayQ.length; i++) {
        const doLech = Math.abs(q - arrayQ[i])
        if (doLech < doLechNhoNhat) {
          doLechNhoNhat = doLech
          ganNhat = arrayQ[i]
        }
      }

      return ganNhat
    }

    // Hàm hoàn chỉnh tính q và chọn giá trị gần nhất
    const tinhHeSoDuongKinhQ = (z2: number): number => {
      const q = 0.26 * z2
      return chonQGanNhat(q)
    }

    const heSoDuongKinh_q = tinhHeSoDuongKinhQ(soRangBanhVit_z2)

    // 2.5 Chọn hiệu suất sơ bộ của bộ truyền trục vít

    //Tính hiệu suất sơ bộ
    const chonHieuSuatSoBo = (z1: number): number => {
      let min: number, max: number

      if (z1 === 1) {
        min = 0.7
        max = 0.75
      } else if (z1 === 2) {
        min = 0.75
        max = 0.82
      } else if (z1 === 4) {
        min = 0.87
        max = 0.92
      } else {
        throw new Error('Giá trị z1 không nằm trong các trường hợp được hỗ trợ (1, 2, 4)')
      }

      const hieuSuat = Math.random() * (max - min) + min
      return Math.round(hieuSuat * 100) / 100 // làm tròn 2 chữ số
    }

    const hieuSuatSoBo_n = chonHieuSuatSoBo(soMoiRen_z1)

    // 2.6 Tính khoảng cách trục aω theo độ bền tiếp xúc
    type CapChinhXac = 6 | 7 | 8 | 9

    type BangKv = {
      [key in CapChinhXac]: { khoang: [number, number]; giaTri: number }[]
    }

    const bangKv: BangKv = {
      6: [
        { khoang: [3, 7.5], giaTri: 1 },
        { khoang: [7.5, 12], giaTri: 1.1 },
        { khoang: [12, 16], giaTri: 1.3 }
      ],
      7: [
        { khoang: [0, 1.5], giaTri: 1 },
        { khoang: [1.5, 3], giaTri: 1 },
        { khoang: [3, 7.5], giaTri: 1.1 },
        { khoang: [7.5, 12], giaTri: 1.2 }
      ],
      8: [
        { khoang: [0, 1.5], giaTri: 1.15 },
        { khoang: [1.5, 3], giaTri: 1.25 },
        { khoang: [3, 7.5], giaTri: 1.4 }
      ],
      9: [{ khoang: [0, 1.5], giaTri: 1.25 }]
    }

    //Bảng tìm Kv
    function timKv(capChinhXac: CapChinhXac, vanTocTruot: number): number | null {
      const giaTriKv = bangKv[capChinhXac]
      for (const muc of giaTriKv) {
        const [min, max] = muc.khoang
        if (vanTocTruot >= min && vanTocTruot < max) {
          return muc.giaTri
        }
      }
      return null
    }

    const capChinhXacTyped = capChinhXac as CapChinhXac
    const heSoTaiTrong_Kv = timKv(capChinhXacTyped, vanTocTruot_Vs) ?? 1 // Giá trị mặc định là 1

    //Giá trị Kb mặc định
    const heSoTapTrungTaiTrong_Kb = 0.9

    //Tính Kh
    const tinhKh = (Kv: number, Kb: number): number => {
      const Kh = Kv * Kb
      return Kh
    }

    const heSoTrongTaiTinh_Kh = tinhKh(heSoTaiTrong_Kv, heSoTapTrungTaiTrong_Kb)

    //Tính khoảng cách trục aω
    const tinhAw = (q: number, z2: number, oH: number, T2: number, Kh: number): number => {
      const aw = (1 + q / z2) * Math.pow((170 / oH) ** 2 * ((T2 * Kh) / (q / z2)), 1 / 3)
      return aw
    }

    // const khoangCachTruc_aw = tinhAw(heSoDuongKinh_q, soRangBanhVit_z2, ungSuatTiepXucChoPhep_oH, T2, heSoTrongTaiTinh_Kh).toFixed(2);
    const khoangCachTruc_aw = Number(
      tinhAw(heSoDuongKinh_q, soRangBanhVit_z2, 165, result.chapter1.T_II, 1.25).toFixed(2)
    )

    //Tính mô-đun m
    const tinhM = (aw: number, z2: number, q: number): number => {
      const m = (2 * aw) / (z2 + q)
      return chonQGanNhat(m)
    }

    const modun_m = tinhM(khoangCachTruc_aw, soRangBanhVit_z2, heSoDuongKinh_q)

    // 2.7. Xác định kích thước chính của bộ truyền

    //Tính thông số của Trục Vít
    //Tính d1
    const tinhD1 = (m: number, q: number): number => {
      const d1 = m * q
      return d1
    }

    const duongKinhVongChia_d1 = tinhD1(modun_m, heSoDuongKinh_q)

    //Tính da1
    const tinhDa1 = (d1: number, m: number): number => {
      const da1 = d1 + 2 * m
      return da1
    }

    const duongKinhVongDinh_da1 = tinhDa1(duongKinhVongChia_d1, modun_m)

    //Tính df1
    const tinhDf1 = (d1: number, m: number): number => {
      const df1 = d1 - 2.4 * m
      return df1
    }

    const duongKinhVongDay_df1 = tinhDf1(duongKinhVongChia_d1, modun_m)

    //Tính y
    const tinhY = (z1: number, q: number): number => {
      const y = Math.atan(z1 / q) * (180 / Math.PI)
      return Math.ceil(y)
    }

    const gocXoanOcVit_y = tinhY(soMoiRen_z1, heSoDuongKinh_q)

    //Do z1=4 => C1=12.5 và C2=0.09
    const C1 = 12.5
    const C2 = 0.09

    //Tính b1
    const tinhB1 = (c1: number, c2: number, z2: number, m: number): number => {
      // console.log(c1, c2, z2, m)
      const b1 = (c1 + c2 * z2) * m
      return Math.ceil(b1)
    }

    const chieuDaiPhanCatRenTrucVit_b1 = tinhB1(C1, C2, soRangBanhVit_z2, modun_m)

    //Tính thông số của Bánh Vít
    //Tính d2
    const tinhD2 = (m: number, z2: number): number => {
      const d1 = m * z2
      return d1
    }

    const duongKinhVongChia_d2 = tinhD2(modun_m, soRangBanhVit_z2)

    //Tính da2
    const tinhDa2 = (m: number, z2: number): number => {
      const da2 = m * (z2 + 2)
      return da2
    }

    const duongKinhVongDinh_da2 = tinhDa2(modun_m, soRangBanhVit_z2)

    //Tính df1
    const tinhDf2 = (m: number, z2: number): number => {
      const df2 = m * (z2 - 2.4)
      return df2
    }

    const duongKinhVongDay_df2 = tinhDf2(modun_m, soRangBanhVit_z2)

    //Tính aw
    const tinhAw_Banhvit = (m: number, z2: number, q: number): number => {
      const aw = (m * (z2 + q)) / 2
      return aw
    }

    const khoangCachTrucCuaBanhVit_aw = tinhAw_Banhvit(modun_m, soRangBanhVit_z2, heSoDuongKinh_q)

    //Tính daM2
    const tinhDaM2 = (da2: number, m: number, z1: number): number => {
      const daM2 = da2 + (6 * m) / z1 + 2
      return Math.floor(daM2)
    }

    const duongKinhLonNhatCuaBanhVit_daM2 = tinhDaM2(duongKinhVongDinh_da2, modun_m, soMoiRen_z1)

    //Tính b2
    const tinhB2 = (da1: number): number => {
      const b2 = 0.75 * da1
      return Math.floor(b2)
    }

    const chieuRongCuaBanhVit_b2 = tinhB2(duongKinhVongDinh_da1)

    // 2.8. Xác định vận tốc trượt

    //Tính Vs (Xác định)
    const xacDinhVs = (m: number, n1: number, z1: number, q: number): number => {
      const vs = ((m * n1) / 19500) * Math.pow(z1 * z1 + q * q, 1 / 2)
      return vs
    }

    const vanTocTruotXacDinh_VsXacDinh = Number(
      xacDinhVs(modun_m, result.chapter1.n_I, soMoiRen_z1, heSoDuongKinh_q).toFixed(2)
    )

    //Tính hiệu xuất n

    //Tính góc q'
    const tinhQphay = (vsXacDinh: number): number => {
      const n = Math.atan(0.048 / Math.pow(vsXacDinh, 0.36)) * (180 / Math.PI)
      return n
    }

    const goc_qphay = Number(tinhQphay(vanTocTruotXacDinh_VsXacDinh).toFixed(1))

    const degToRad = (deg: number): number => {
      return deg * (Math.PI / 180)
    }

    //Tính n
    const tinhN = (y: number, qphay: number): number => {
      const yRad = degToRad(y)
      const qphayRad = degToRad(qphay)
      const n = 0.925 * (Math.tan(yRad) / Math.tan(yRad + qphayRad))
      return n
    }

    const hieuSuat_N = Number(tinhN(gocXoanOcVit_y, goc_qphay).toFixed(2))

    // 2.9. Tính toán lại ứng suất tiếp xúc cho phép

    const tinhLaiUngSuatTiepXucChoPhep = (vs: number, vsXacDinh: number): number => {
      const min1 = 276 - 25 * vs
      const max1 = 300 - 25 * vs
      const min2 = 276 - 25 * vsXacDinh
      const max2 = 300 - 25 * vsXacDinh
      const chon = Math.random() * (max2 - min1) + min1

      return chon
    }

    const ungSuatTiepXucChoPhep_oHtinhLai = Number(
      tinhLaiUngSuatTiepXucChoPhep(vanTocTruot_Vs, vanTocTruotXacDinh_VsXacDinh).toFixed(2)
    )

    // 2.10. Xác định số răng tương đương bánh vít

    //Tính Zv2
    const tinhZv2 = (z2: number, y: number): number => {
      const zv2 = z2 / Math.pow(Math.cos(degToRad(y)), 3)
      return zv2
    }

    const Zv2 = Number(tinhZv2(soRangBanhVit_z2, gocXoanOcVit_y).toFixed(1))

    //Tính YF2
    const zv2List = [28, 30, 32, 35, 37, 40, 45, 50, 60, 80, 100, 150, 300]
    const yF2List = [1.8, 1.76, 1.71, 1.64, 1.61, 1.55, 1.48, 1.45, 1.4, 1.34, 1.3, 1.27, 1.24]

    function timYF2(zv2: number): number {
      let indexGanNhat = 0
      let khoangCachNhoNhat = Math.abs(zv2 - zv2List[0])

      for (let i = 1; i < zv2List.length; i++) {
        const khoangCach = Math.abs(zv2 - zv2List[i])
        if (khoangCach < khoangCachNhoNhat) {
          indexGanNhat = i
          khoangCachNhoNhat = khoangCach
        }
      }

      return yF2List[indexGanNhat]
    }

    const YF2 = timYF2(Zv2)

    //Kiếm nghiệm độ bền uốn vít oF
    const Kf = heSoTrongTaiTinh_Kh

    const kiemNghiemDoBenUonVitOf = (
      T2: number,
      yf2: number,
      kf: number,
      d2: number,
      b2: number,
      m: number
    ): number => {
      const of = (1.2 * T2 * yf2 * kf) / (d2 * b2 * m)
      return of
    }

    const doBenUonVit_oF = Number(
      kiemNghiemDoBenUonVitOf(
        result.chapter1.T_II,
        YF2,
        Kf,
        duongKinhVongChia_d2,
        chieuRongCuaBanhVit_b2,
        modun_m
      ).toFixed(2)
    )
    console.log(`Kiểm nghiệm độ bền uốn của bánh vít oF = ${doBenUonVit_oF}`)

    if (doBenUonVit_oF < ungSuatUonChoPhep_oF) {
      console.log(`Độ bền uốn của bánh vít oF = ${doBenUonVit_oF} hợp lệ`)
    } else {
      console.log(`Độ bền uốn của bánh vít oF = ${doBenUonVit_oF} không hợp lệ`)
    }

    // 2.11. Tính toán nhiệt
    const heSoToaNhiet_Kt = 16
    const dienTichBeMatThoatNhiet_A = 20 * Math.pow(khoangCachTrucCuaBanhVit_aw / 1000, 1.7)
    const heSoThoatNhietQuaBeMay_psi = 0.3
    const nhietDoMoiTruongXungQuanh_t0 = 30

    //Tính t1
    const tinhT1 = (t0: number, P: number, n: number, Kt: number, A: number, psi: number): number => {
      //n dang chay random
      const t1 = t0 + (1000 * P * (1 - n)) / (Kt * A * (1 + psi))
      return t1
    }

    //t1 chay random theo n
    const nhietDoDau_t1 = Math.ceil(
      tinhT1(
        nhietDoMoiTruongXungQuanh_t0,
        result.chapter1.P_dc,
        hieuSuatSoBo_n,
        heSoToaNhiet_Kt,
        dienTichBeMatThoatNhiet_A,
        heSoThoatNhietQuaBeMay_psi
      )
    )
    console.log(`Nhiệt độ dầu t1 = ${nhietDoDau_t1}`)

    if (nhietDoDau_t1 <= 95) {
      console.log(`Nhiệt độ dầu t1 = ${nhietDoDau_t1} nằm trong phạm vi cho phép`)
    } else {
      console.log(`Nhiệt độ dầu t1 = ${nhietDoDau_t1} nằm ngoài phạm vi cho phép`)
    }

    // 2.12. Giá trị các lực tín lực vòng trục vít, bánh vít, lực hướng tâm trục vít và bánh vít

    //Tính Ft1 và Fa2
    const tinhFt1Fa2 = (T1: number, d1: number): number => {
      const x = (2 * T1) / d1
      return x
    }

    const lucVongTrucVit_Ft1 = Number(tinhFt1Fa2(result.chapter1.T_I, duongKinhVongChia_d1).toFixed(2))
    const lucDocTrucBanhVit_Fa2 = Number(tinhFt1Fa2(result.chapter1.T_I, duongKinhVongChia_d1).toFixed(2))

    //Tính Ft2 và Fa1
    const tinhFt2Fa1 = (T2: number, d2: number): number => {
      const x = (2 * T2) / d2
      return x
    }

    const lucVongTrucVit_Ft2 = Number(tinhFt2Fa1(result.chapter1.T_II, duongKinhVongChia_d2).toFixed(2))
    const lucDocTrucBanhVit_Fa1 = Number(tinhFt2Fa1(result.chapter1.T_II, duongKinhVongChia_d2).toFixed(2))

    //Tính Fr1 và Fr2
    const alpha = 20

    const tinhFr = (Ft2: number, alpha: number): number => {
      const fr = Ft2 * Math.tan(degToRad(alpha))
      return fr
    }

    const lucHuongTamTrucVit_Fr1 = Number(tinhFr(lucVongTrucVit_Ft2, alpha).toFixed(2))
    const lucHuongTamBanhVit_Fr2 = Number(tinhFr(lucVongTrucVit_Ft2, alpha).toFixed(2))
    // console.log(
    //   `Lực hướng tâm trục vít và bánh vít Fr1 = Fr2 = ${lucHuongTamTrucVit_Fr1} = ${lucHuongTamBanhVit_Fr2} (N)`
    // )

    //Tra oF cho phép theo bảng
    const bangSigmaF: { [key: string]: number } = {
      C35: 55,
      C45: 60,
      '40CrNi': 80,
      CT6: 60,
      '15Cr': 65,
      '12CrNi3': 70,
      C40: 60
    }

    function traCuuSigmaF(loaiThep: string): number | null {
      return bangSigmaF[loaiThep] ?? null
    }

    const ungSuatUonChoPhep_oFtraBang = Number(traCuuSigmaF(vatLieu.trucVit))
    // console.log(`Ứng suất uốn cho phép tra theo bảng oF = ${ungSuatUonChoPhep_oFtraBang} (MPa)`)

    //Tính MF
    const l = duongKinhVongChia_d2

    const tinhMf = (Ft1: number, l: number, Fr1: number, Fa1: number, d1: number): number => {
      const mf = Math.pow(Math.pow((Ft1 * l) / 4, 2) + Math.pow((Fr1 * l) / 4 + (Fa1 * d1) / 4, 2), 1 / 2)
      return mf
    }

    const Mf = Number(
      tinhMf(lucVongTrucVit_Ft1, l, lucHuongTamTrucVit_Fr1, lucDocTrucBanhVit_Fa1, duongKinhVongChia_d1).toFixed(2)
    )
    // console.log(`Mf = ${Mf} (Nmm)`)

    //Tính Mtd
    const tinhMtd = (Mf: number, T1: number): number => {
      const mtd = Math.pow(Mf * Mf + 0.75 + T1 * T1, 1 / 2)
      return mtd
    }

    const momentTuongDuong_mtd = Number(tinhMtd(Mf, result.chapter1.T_I).toFixed(2))
    // console.log(`Moment tương đương Mtd = ${momentTuongDuong_mtd} (Nmm)`)

    //Tính oF
    const tinhoF2 = (mtd: number, df1: number): number => {
      const of = (32 * mtd) / (Math.PI * Math.pow(df1, 3))
      return of
    }

    const ungSuatUon_oF2 = Number(tinhoF2(momentTuongDuong_mtd, duongKinhVongDay_df1).toFixed(2))
    console.log(`Ứng suất uốn oF2 = ${ungSuatUon_oF2} (MPa)`)

    //So sánh lại với oF cho phép
    if (ungSuatUon_oF2 < ungSuatUonChoPhep_oFtraBang) {
      console.log(`Ứng suất uốn oF2 = ${ungSuatUon_oF2} (MPa) hợp lệ`)
    } else {
      console.log(`Ứng suất uốn oF2 = ${ungSuatUon_oF2} (MPa) ko hợp lệ`)
    }

    // 2.13. Kiểm tra độ cứng của trục vít
    const E = 210000

    //Tính Je
    const tinhJe = (da1: number, df1: number): number => {
      const Je = ((0.375 + (0.625 * da1) / df1) * Math.PI * Math.pow(df1, 4)) / 64
      return Je
    }

    const momentQuanTinhTuongDuongMatCatTrucVit_Je = Number(
      tinhJe(duongKinhVongDinh_da1, duongKinhVongDay_df1).toFixed(2)
    )

    //Tính y
    const tinhDoCungY = (l: number, fr1: number, ft1: number, E: number, Je: number): number => {
      const y = (Math.pow(l, 3) * Math.pow(fr1 * fr1 + ft1 * ft1, 1 / 2)) / (48 * E * Je)
      return y
    }

    const doCungCuaTrucVit_y = Number(
      tinhDoCungY(l, lucHuongTamTrucVit_Fr1, lucVongTrucVit_Ft1, E, momentQuanTinhTuongDuongMatCatTrucVit_Je).toFixed(5)
    )

    const sizeOfTranmission = {
      truc_vit: {
        d1: duongKinhVongChia_d1,
        da1: duongKinhVongDinh_da1,
        df1: duongKinhVongDay_df1,
        y: gocXoanOcVit_y,
        b1: chieuDaiPhanCatRenTrucVit_b1
      },
      banh_vit: {
        d2: duongKinhVongChia_d2,
        da2: duongKinhVongDinh_da2,
        df2: duongKinhVongDay_df2,
        aw: khoangCachTrucCuaBanhVit_aw,
        daM2: duongKinhLonNhatCuaBanhVit_daM2,
        b2: chieuRongCuaBanhVit_b2
      },
      Fr1: lucHuongTamTrucVit_Fr1,
      Ft2: lucVongTrucVit_Ft2,
      Ft1: lucVongTrucVit_Ft1
    }

    return super.handle(
      input,
      {
        ...result,
        sizeOfTranmission
      },
      request
    )
  }
}
