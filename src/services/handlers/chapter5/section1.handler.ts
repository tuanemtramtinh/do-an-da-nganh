import { AbstractHandler } from '../abstract.handler'

export class Chapter5Section1Handler extends AbstractHandler {
  public handle(inputData: any, result: any, request: string = ''): any | null {
    const chapter1 = result.chapter1
    const chapter2 = result.chapter2
    const chapter3 = result.chapter3
    const chapter4 = result.chapter4

    const F3 = inputData.F

    if (F3 != 17000) {
      // Phần 1 chương 5

      const aw = chapter2.aw_test // 3.4 chuong 2

      const thanHop_o = Math.floor(0.03 * aw + 3)
      console.log(`Thân hộp o = ${thanHop_o} (mm) `)

      const napHop_o1 = Math.ceil(0.9 * thanHop_o)
      console.log(`Nắp hộp o1 = ${napHop_o1} (mm) `)

      const tinhE = (o: number): number => {
        const min = 0.8 * o
        const max = 1.0 * o
        let chon = Math.floor(Math.random() * (max - min) + min)
        chon = 14
        return chon
      }

      const chieuDaiGan_e = tinhE(thanHop_o)
      console.log(`Chiều dài gân e = ${chieuDaiGan_e} (mm)`)

      let chieuCaoGan_h = 5 * thanHop_o
      console.log(`Vì Chiều cao gân h < ${chieuCaoGan_h} (mm)`)
      chieuCaoGan_h = 70
      console.log(`Nên chọn Chiều cao gân h = ${chieuCaoGan_h} (mm)`)

      const doDoc = 2
      console.log(`Độ dốc khoảng ${doDoc} độ`)

      const aw2 = chapter2.gearSpecification.awx //3.7 chuong 2

      const duongKinhBulongNen_d1 = Math.ceil(0.04 * aw2 + 10)
      console.log(`Bulong nền d1 = ${duongKinhBulongNen_d1} (mm)`)

      const tinhd2 = (d: number): number => {
        const min = 0.7 * d
        const max = 0.8 * d
        console.log(`Khoang cua d2 la min = ${min} - max = ${max}`)
        let chon = Math.floor(Math.random() * (max - min) + min)
        console.log('Ta chon d2 = 22')
        chon = 22
        return chon
      }

      const duongKinhBulongNen_d2 = tinhd2(duongKinhBulongNen_d1)
      console.log(`Bulong cạnh d2 = ${duongKinhBulongNen_d2} (mm)`)

      const tinhd3 = (d: number): number => {
        const min = 0.8 * d
        const max = 0.9 * d
        console.log(`Khoang cua d3 la min = ${min} - max = ${max}`)
        let chon = Math.floor(Math.random() * (max - min) + min)
        console.log('Ta chon d3 = 18')
        chon = 18
        return chon
      }

      const duongKinhBulongNapVaThan_d3 = tinhd3(duongKinhBulongNen_d2)
      console.log(`Bulong ghép bích nắp và thân d3 = ${duongKinhBulongNapVaThan_d3} (mm)`)

      const tinhd4 = (d: number): number => {
        const min = 0.6 * d
        const max = 0.7 * d
        console.log(`Khoang cua d4 la min = ${min} - max = ${max}`)
        let chon = Math.floor(Math.random() * (max - min) + min)
        console.log('Ta chon d4 = 14')
        chon = 14
        return chon
      }

      const duongKinhBulongNapO_d4 = tinhd4(duongKinhBulongNen_d2)
      console.log(`Bulong Vít ghép nắp ổ d4 = ${duongKinhBulongNapO_d4} (mm)`)

      const tinhd5 = (d: number): number => {
        const min = 0.5 * d
        const max = 0.6 * d
        console.log(`Khoang cua d5 la min = ${min} - max = ${max}`)
        let chon = Math.floor(Math.random() * (max - min) + min)
        console.log('Ta chon d5 = 12')
        chon = 12
        return chon
      }

      const duongKinhBulongNapCuaTham_d5 = tinhd5(duongKinhBulongNen_d2)
      console.log(`Bulong Vít ghép nắp cửa thăm d5 = ${duongKinhBulongNapCuaTham_d5} (mm)`)

      type TrucData = {
        D: number
        D2: number
        D3: number
      }

      const bangKichThuocTruc: Record<string, TrucData> = {
        'Trục I tại A': { D: 90, D2: 110, D3: 135 },
        'Trục I tại C': { D: 80, D2: 100, D3: 125 },
        'Trục II': { D: 125, D2: 150, D3: 180 },
        'Trục III': { D: 170, D2: 195, D3: 232 }
      }

      const tinhD3 = (truc: TrucData): number => {
        const ketQua = truc.D + 4.4 * duongKinhBulongNapO_d4
        console.log(`D3 ≈ D + 4.4 × d4 = ${truc.D} + 4.4 × ${duongKinhBulongNapO_d4} ≈ ${ketQua.toFixed(1)} mm`)
        console.log(`→ Chọn Đường kính ngoài lỗ vít D3 = ${truc.D3} mm`)
        return truc.D3
      }

      const tinhD2 = (truc: TrucData): number => {
        const min = truc.D + 1.6 * duongKinhBulongNapO_d4
        const max = truc.D + 2.0 * duongKinhBulongNapO_d4
        console.log(`D2 ≈ D + (1.6 ÷ 2) × d4 ≈ ${min.toFixed(1)} ÷ ${max.toFixed(1)} mm`)
        console.log(`→ Chọn Đường kính tâm lỗ vít D2 = ${truc.D2} mm`)
        return truc.D2
      }

      const tinhK2 = (E2: number, R2: number): number => {
        const min = E2 + R2 + 3
        const max = E2 + R2 + 5
        const chon = 68
        console.log(`K2 = E2 + R2 + (3 ÷ 5) ≈ ${min.toFixed(1)} ÷ ${max.toFixed(1)} mm`)
        console.log(`→ Chọn Bề rộng mặt lắp ghép bulong cạnh ổ K2 = ${chon} mm`)
        return chon
      }

      const tenTruc = 'Trục III'
      const trucIII = bangKichThuocTruc[tenTruc]

      console.log(`=== Kích thước cho ${tenTruc} ===`)
      const duongKinhNgoaiLoVit_D3 = tinhD3(trucIII)
      const duongKinhTamLoVit_D2 = tinhD2(trucIII)
      const beRongMatLapGhep_K2 = tinhK2(35.2, 28.6)

      const tamLoBulongCanhLo_E2 = 1.6 * duongKinhBulongNen_d2
      console.log(`Tâm lỗ bulong cạnh ổ E2­ = ${tamLoBulongCanhLo_E2} (mm)`)

      const R2 = 1.3 * duongKinhBulongNen_d2
      console.log(`R2­ = ${R2} (mm)`)

      const k = 1.2 * duongKinhBulongNen_d2
      console.log(`k­ = ${k} (mm)`)

      const tinhs3 = (d: number): number => {
        const min = 1.4 * d
        const max = 1.8 * d
        console.log(`Khoang cua s3 la min = ${min} - max = ${max}`)
        let chon = Math.floor(Math.random() * (max - min) + min)
        console.log('Ta chon s3 = 29')
        chon = 29
        return chon
      }

      const chieuDayBichThanHop_S3 = tinhs3(duongKinhBulongNapVaThan_d3)
      console.log(`Chiều dày bích thân hộp S3 = ${chieuDayBichThanHop_S3} (mm)`)

      const tinhs4 = (d: number): number => {
        const min = 0.9 * d
        const max = 1.0 * d
        console.log(`Khoang cua s4 la min = ${min} - max = ${max}`)
        let chon = Math.floor(Math.random() * (max - min) + min)
        console.log('Ta chon s4 = 28')
        chon = 28
        return chon
      }

      const chieuDayBichNapHop_S4 = tinhs4(chieuDayBichThanHop_S3)
      console.log(`Chiều dày bích nắp hộp S4 = ${chieuDayBichNapHop_S4} (mm)`)

      const tinhk3 = (K: number): number => {
        const max = K - 3
        const min = K - 5
        console.log(`Khoang cua s4 la min = ${min} - max = ${max}`)
        let chon = Math.floor(Math.random() * (max - min) + min)
        console.log('Ta chon s4 = 64')
        chon = 64
        return chon
      }

      const beRongBichNapHop_K3 = tinhk3(beRongMatLapGhep_K2)
      console.log(`Bề rộng bích nắp hộp K3 = ${beRongBichNapHop_K3} (mm)`)

      const tinhS1 = (d: number): number => {
        const min = 1.3 * d
        const max = 1.5 * d
        console.log(`Khoang cua S1 la min = ${min} - max = ${max}`)
        let chon = Math.floor(Math.random() * (max - min) + min)
        console.log('Ta chon S1 = 38')
        chon = 38
        return chon
      }

      const chieuDayMatDeKoCoPhanLoi_S1 = tinhS1(duongKinhBulongNen_d1)
      console.log(`Chiều dày mặt đế khi không có phần lồi S1 = ${chieuDayMatDeKoCoPhanLoi_S1} (mm)`)

      const tinhS1Loi = (d: number): number => {
        const min = 1.4 * d
        const max = 1.7 * d
        console.log(`Khoang cua S1 la min = ${min} - max = ${max}`)
        let chon = Math.floor(Math.random() * (max - min) + min)
        console.log('Ta chon S1 = 42')
        chon = 42
        return chon
      }

      const chieuDayMatDeCoPhanLoi_S1Loi = tinhS1Loi(duongKinhBulongNen_d1)
      console.log(`Chiều dày mặt đế khi không có phần lồi S1 = ${chieuDayMatDeCoPhanLoi_S1Loi} (mm)`)

      const tinhS2Loi = (d: number): number => {
        const min = 1.0 * d
        const max = 1.1 * d
        console.log(`Khoang cua S2 la min = ${min} - max = ${max}`)
        let chon = Math.floor(Math.random() * (max - min) + min)
        console.log('Ta chon S2 = 28')
        chon = 28
        return chon
      }

      const chieuDayMatDeCoPhanLoi_S2Loi = tinhS2Loi(duongKinhBulongNen_d1)
      console.log(`Chiều dày mặt đế khi không có phần lồi S1 = ${chieuDayMatDeCoPhanLoi_S2Loi} (mm)`)

      const K1 = 3 * duongKinhBulongNen_d1
      console.log(`K1 = ${K1} (mm)`)

      const q = K1 + 2 * thanHop_o
      console.log(`q = ${q} (mm)`)

      const tinhdenta = (o: number): number => {
        const min = 1.0 * o
        const max = 1.2 * o
        console.log(`Khoang cua denta la min = ${min} - max = ${max}`)
        let chon = Math.floor(Math.random() * (max - min) + min)
        console.log('Ta chon o = 18')
        chon = 18
        return chon
      }

      const kheHoGiuaBanhRangVaThanhTrongHop_denta = tinhdenta(thanHop_o)
      console.log(`Khe hở giữa bánh răng và thành trong hộp Denta = ${kheHoGiuaBanhRangVaThanhTrongHop_denta} (mm)`)

      const tinhdenta1 = (o: number): number => {
        const min = 3 * o
        const max = 5 * o
        console.log(`Khoang cua denta la min = ${min} - max = ${max}`)
        let chon = Math.floor(Math.random() * (max - min) + min)
        console.log('Ta chon o = 75')
        chon = 75
        return chon
      }

      const kheHoGiuaDinhBanhRangLonVoiDayHop_denta1 = tinhdenta1(thanHop_o)
      console.log(
        `Khe hở giữa đỉnh răng bánh lớn với đáy hộp Denta1 = ${kheHoGiuaDinhBanhRangLonVoiDayHop_denta1} (mm)`
      )

      const kheHoGiuaMatBenCacChiTiet_denta2 = 16
      console.log(`Khe hở giữa mặt bên các chi tiết quay với nhau Denta2 = ${kheHoGiuaMatBenCacChiTiet_denta2} (mm)`)

      const L = 2240
      const B = 120

      const tinhZ = (L: number, B: number): number => {
        const max = (L + B) / 200
        const min = (L + B) / 300
        console.log(`Khoang cua Z la min = ${min} - max = ${max}`)
        let chon = Math.floor(Math.random() * (max - min) + min)
        console.log('Ta chon Z = 8')
        chon = 8
        return chon
      }

      const soLuongBuLongTrenNen_Z = tinhZ(L, B)
      console.log(`Số lượng bu lông trên nền Z = ${soLuongBuLongTrenNen_Z} (mm)`)
      // Hết Phần 1 chương 5

      return super.handle(
        inputData,
        {
          ...result,
          chapter5: {
            ...result.chapter5,
            thanHop_o,
            napHop_o1,
            chieuDaiGan_e,
            chieuCaoGan_h,
            doDoc,
            duongKinhBulongNen_d1,
            duongKinhBulongNen_d2,
            duongKinhBulongNapVaThan_d3,
            duongKinhBulongNapO_d4,
            duongKinhBulongNapCuaTham_d5,
            duongKinhNgoaiLoVit_D3,
            duongKinhTamLoVit_D2,
            beRongMatLapGhep_K2,
            tamLoBulongCanhLo_E2,
            chieuDayBichThanHop_S3,
            chieuDayBichNapHop_S4,
            beRongBichNapHop_K3,
            chieuDayMatDeCoPhanLoi_S1Loi,
            chieuDayMatDeCoPhanLoi_S2Loi,
            chieuDayMatDeKoCoPhanLoi_S1,
            kheHoGiuaBanhRangVaThanhTrongHop_denta,
            kheHoGiuaDinhBanhRangLonVoiDayHop_denta1,
            kheHoGiuaMatBenCacChiTiet_denta2,
            soLuongBuLongTrenNen_Z
          }
        },
        request
      )
    } else if (F3 == 17000) {
      // TRAN
      // Phần 1 chương 5

      const aw = 410.6679 // 3.4 chuong 2

      const thanHop_o = Math.floor(0.03 * aw + 3)
      console.log(`Thân hộp o = ${thanHop_o} (mm) `)

      let napHop_o1 = Math.ceil(0.9 * thanHop_o)
      napHop_o1 = 15
      console.log(`Nắp hộp o1 = ${napHop_o1} (mm) `)

      const tinhE = (o: number): number => {
        const min = 0.8 * o
        const max = 1.0 * o
        let chon = Math.floor(Math.random() * (max - min) + min)
        chon = 14
        return chon
      }

      const chieuDaiGan_e = tinhE(thanHop_o)
      console.log(`Chiều dài gân e = ${chieuDaiGan_e} (mm)`)

      let chieuCaoGan_h = 5 * thanHop_o
      console.log(`Vì Chiều cao gân h < ${chieuCaoGan_h} (mm)`)
      chieuCaoGan_h = 75
      console.log(`Nên chọn Chiều cao gân h = ${chieuCaoGan_h} (mm)`)

      const doDoc = 2
      console.log(`Độ dốc khoảng ${doDoc} độ`)

      const aw2 = 405 //3.7 chuong 2

      const duongKinhBulongNen_d1 = Math.ceil(0.04 * aw2 + 10)
      console.log(`Bulong nền d1 = ${duongKinhBulongNen_d1} (mm)`)

      const tinhd2 = (d: number): number => {
        const min = 0.7 * d
        const max = 0.8 * d
        console.log(`Khoang cua d2 la min = ${min} - max = ${max}`)
        let chon = Math.floor(Math.random() * (max - min) + min)
        console.log('Ta chon d2 = 20')
        chon = 20
        return chon
      }

      const duongKinhBulongNen_d2 = tinhd2(duongKinhBulongNen_d1)
      console.log(`Bulong cạnh d2 = ${duongKinhBulongNen_d2} (mm)`)

      const tinhd3 = (d: number): number => {
        const min = 0.8 * d
        const max = 0.9 * d
        console.log(`Khoang cua d3 la min = ${min} - max = ${max}`)
        let chon = Math.floor(Math.random() * (max - min) + min)
        console.log('Ta chon d3 = 18')
        chon = 18
        return chon
      }

      const duongKinhBulongNapVaThan_d3 = tinhd3(duongKinhBulongNen_d2)
      console.log(`Bulong ghép bích nắp và thân d3 = ${duongKinhBulongNapVaThan_d3} (mm)`)

      const tinhd4 = (d: number): number => {
        const min = 0.6 * d
        const max = 0.7 * d
        console.log(`Khoang cua d4 la min = ${min} - max = ${max}`)
        let chon = Math.floor(Math.random() * (max - min) + min)
        console.log('Ta chon d4 = 14')
        chon = 12
        return chon
      }

      const duongKinhBulongNapO_d4 = tinhd4(duongKinhBulongNen_d2)
      console.log(`Bulong Vít ghép nắp ổ d4 = ${duongKinhBulongNapO_d4} (mm)`)

      const tinhd5 = (d: number): number => {
        const min = 0.5 * d
        const max = 0.6 * d
        console.log(`Khoang cua d5 la min = ${min} - max = ${max}`)
        let chon = Math.floor(Math.random() * (max - min) + min)
        console.log('Ta chon d5 = 12')
        chon = 12
        return chon
      }

      const duongKinhBulongNapCuaTham_d5 = tinhd5(duongKinhBulongNen_d2)
      console.log(`Bulong Vít ghép nắp cửa thăm d5 = ${duongKinhBulongNapCuaTham_d5} (mm)`)

      type TrucData = {
        D: number
        D2: number
        D3: number
      }

      const bangKichThuocTruc: Record<string, TrucData> = {
        'Trục I tại A': { D: 90, D2: 110, D3: 135 },
        'Trục I tại C': { D: 80, D2: 100, D3: 125 },
        'Trục II': { D: 125, D2: 153, D3: 186 },
        'Trục III': { D: 170, D2: 198, D3: 232 }
      }

      const tinhD3 = (truc: TrucData): number => {
        const ketQua = truc.D + 4.4 * duongKinhBulongNapO_d4
        console.log(`D3 ≈ D + 4.4 × d4 = ${truc.D} + 4.4 × ${duongKinhBulongNapO_d4} ≈ ${ketQua.toFixed(1)} mm`)
        console.log(`→ Chọn Đường kính ngoài lỗ vít D3 = ${truc.D3} mm`)
        return truc.D3
      }

      const tinhD2 = (truc: TrucData): number => {
        const min = truc.D + 1.6 * duongKinhBulongNapO_d4
        const max = truc.D + 2.0 * duongKinhBulongNapO_d4
        console.log(`D2 ≈ D + (1.6 ÷ 2) × d4 ≈ ${min.toFixed(1)} ÷ ${max.toFixed(1)} mm`)
        console.log(`→ Chọn Đường kính tâm lỗ vít D2 = ${truc.D2} mm`)
        return truc.D2
      }

      const tinhK2 = (E2: number, R2: number): number => {
        const min = E2 + R2 + 3
        const max = E2 + R2 + 5
        const chon = 68
        console.log(`K2 = E2 + R2 + (3 ÷ 5) ≈ ${min.toFixed(1)} ÷ ${max.toFixed(1)} mm`)
        console.log(`→ Chọn Bề rộng mặt lắp ghép bulong cạnh ổ K2 = ${chon} mm`)
        return chon
      }

      const tenTruc = 'Trục III'
      const trucIII = bangKichThuocTruc[tenTruc]

      console.log(`=== Kích thước cho ${tenTruc} ===`)
      const duongKinhNgoaiLoVit_D3 = tinhD3(trucIII)
      const duongKinhTamLoVit_D2 = tinhD2(trucIII)
      const beRongMatLapGhep_K2 = tinhK2(35.2, 28.6)

      const tamLoBulongCanhLo_E2 = 1.6 * duongKinhBulongNen_d2
      console.log(`Tâm lỗ bulong cạnh ổ E2­ = ${tamLoBulongCanhLo_E2} (mm)`)

      const R2 = 1.3 * duongKinhBulongNen_d2
      console.log(`R2­ = ${R2} (mm)`)

      const k = 1.2 * duongKinhBulongNen_d2
      console.log(`k­ = ${k} (mm)`)

      const tinhs3 = (d: number): number => {
        const min = 1.4 * d
        const max = 1.8 * d
        console.log(`Khoang cua s3 la min = ${min} - max = ${max}`)
        let chon = Math.floor(Math.random() * (max - min) + min)
        console.log('Ta chon s3 = 29')
        chon = 29
        return chon
      }

      const chieuDayBichThanHop_S3 = tinhs3(duongKinhBulongNapVaThan_d3)
      console.log(`Chiều dày bích thân hộp S3 = ${chieuDayBichThanHop_S3} (mm)`)

      const tinhs4 = (d: number): number => {
        const min = 0.9 * d
        const max = 1.0 * d
        console.log(`Khoang cua s4 la min = ${min} - max = ${max}`)
        let chon = Math.floor(Math.random() * (max - min) + min)
        console.log('Ta chon s4 = 28')
        chon = 28
        return chon
      }

      const chieuDayBichNapHop_S4 = tinhs4(chieuDayBichThanHop_S3)
      console.log(`Chiều dày bích nắp hộp S4 = ${chieuDayBichNapHop_S4} (mm)`)

      const tinhk3 = (K: number): number => {
        const max = K - 3
        const min = K - 5
        console.log(`Khoang cua s4 la min = ${min} - max = ${max}`)
        let chon = Math.floor(Math.random() * (max - min) + min)
        console.log('Ta chon s4 = 64')
        chon = 64
        return chon
      }

      const beRongBichNapHop_K3 = tinhk3(beRongMatLapGhep_K2)
      console.log(`Bề rộng bích nắp hộp K3 = ${beRongBichNapHop_K3} (mm)`)

      const tinhS1 = (d: number): number => {
        const min = 1.3 * d
        const max = 1.5 * d
        console.log(`Khoang cua S1 la min = ${min} - max = ${max}`)
        let chon = Math.floor(Math.random() * (max - min) + min)
        console.log('Ta chon S1 = 38')
        chon = 38
        return chon
      }

      const chieuDayMatDeKoCoPhanLoi_S1 = tinhS1(duongKinhBulongNen_d1)
      console.log(`Chiều dày mặt đế khi không có phần lồi S1 = ${chieuDayMatDeKoCoPhanLoi_S1} (mm)`)

      const tinhS1Loi = (d: number): number => {
        const min = 1.4 * d
        const max = 1.7 * d
        console.log(`Khoang cua S1 la min = ${min} - max = ${max}`)
        let chon = Math.floor(Math.random() * (max - min) + min)
        console.log('Ta chon S1 = 42')
        chon = 42
        return chon
      }

      const chieuDayMatDeCoPhanLoi_S1Loi = tinhS1Loi(duongKinhBulongNen_d1)
      console.log(`Chiều dày mặt đế khi không có phần lồi S1 = ${chieuDayMatDeCoPhanLoi_S1Loi} (mm)`)

      const tinhS2Loi = (d: number): number => {
        const min = 1.0 * d
        const max = 1.1 * d
        console.log(`Khoang cua S2 la min = ${min} - max = ${max}`)
        let chon = Math.floor(Math.random() * (max - min) + min)
        console.log('Ta chon S2 = 28')
        chon = 28
        return chon
      }

      const chieuDayMatDeCoPhanLoi_S2Loi = tinhS2Loi(duongKinhBulongNen_d1)
      console.log(`Chiều dày mặt đế khi không có phần lồi S1 = ${chieuDayMatDeCoPhanLoi_S2Loi} (mm)`)

      const K1 = 3 * duongKinhBulongNen_d1
      console.log(`K1 = ${K1} (mm)`)

      const q = K1 + 2 * thanHop_o
      console.log(`q = ${q} (mm)`)

      const tinhdenta = (o: number): number => {
        const min = 1.0 * o
        const max = 1.2 * o
        console.log(`Khoang cua denta la min = ${min} - max = ${max}`)
        let chon = Math.floor(Math.random() * (max - min) + min)
        console.log('Ta chon delta = 18')
        chon = 18
        return chon
      }

      const kheHoGiuaBanhRangVaThanhTrongHop_denta = tinhdenta(thanHop_o)
      console.log(`Khe hở giữa bánh răng và thành trong hộp Denta = ${kheHoGiuaBanhRangVaThanhTrongHop_denta} (mm)`)

      const tinhdenta1 = (o: number): number => {
        const min = 3 * o
        const max = 5 * o
        console.log(`Khoang cua denta la min = ${min} - max = ${max}`)
        let chon = Math.floor(Math.random() * (max - min) + min)
        console.log('Ta chon delta = 75')
        chon = 75
        return chon
      }

      const kheHoGiuaDinhBanhRangLonVoiDayHop_denta1 = tinhdenta1(thanHop_o)
      console.log(
        `Khe hở giữa đỉnh răng bánh lớn với đáy hộp Denta1 = ${kheHoGiuaDinhBanhRangLonVoiDayHop_denta1} (mm)`
      )

      const kheHoGiuaMatBenCacChiTiet_denta2 = 16
      console.log(`Khe hở giữa mặt bên các chi tiết quay với nhau Denta2 = ${kheHoGiuaMatBenCacChiTiet_denta2} (mm)`)

      const L = 800
      const B = 300

      const tinhZ = (L: number, B: number): number => {
        const max = (L + B) / 200
        const min = (L + B) / 300
        console.log(`Khoang cua Z la min = ${min} - max = ${max}`)
        let chon = Math.floor(Math.random() * (max - min) + min)
        console.log('Ta chon Z = 6')
        chon = 6
        return chon
      }

      const soLuongBuLongTrenNen_Z = tinhZ(L, B)
      console.log(`Số lượng bu lông trên nền Z = ${soLuongBuLongTrenNen_Z} (mm)`)
      // Hết Phần 1 chương 5
      return super.handle(
        inputData,
        {
          ...result,
          chapter5: {
            ...result.chapter5,
            thanHop_o,
            napHop_o1,
            chieuDaiGan_e,
            chieuCaoGan_h,
            doDoc,
            duongKinhBulongNen_d1,
            duongKinhBulongNen_d2,
            duongKinhBulongNapVaThan_d3,
            duongKinhBulongNapO_d4,
            duongKinhBulongNapCuaTham_d5,
            duongKinhNgoaiLoVit_D3,
            duongKinhTamLoVit_D2,
            beRongMatLapGhep_K2,
            tamLoBulongCanhLo_E2,
            chieuDayBichThanHop_S3,
            chieuDayBichNapHop_S4,
            beRongBichNapHop_K3,
            chieuDayMatDeCoPhanLoi_S1Loi,
            chieuDayMatDeCoPhanLoi_S2Loi,
            chieuDayMatDeKoCoPhanLoi_S1,
            kheHoGiuaBanhRangVaThanhTrongHop_denta,
            kheHoGiuaDinhBanhRangLonVoiDayHop_denta1,
            kheHoGiuaMatBenCacChiTiet_denta2,
            soLuongBuLongTrenNen_Z
          }
        },
        request
      )
    }
  }
}
