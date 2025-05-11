import { readFileSync } from 'fs'
import mongoose, { Model } from 'mongoose'
import path from 'path'
import puppeteer from 'puppeteer'

export class ExportService {
  private Chapter1: Model<any>
  private Chapter2: Model<any>
  private Chapter3: Model<any>
  private Chapter4: Model<any>
  private Chapter5: Model<any>
  private Chapter6: Model<any>
  private Chapter7: Model<any>

  constructor(
    Chapter1: Model<any>,
    Chapter2: Model<any>,
    Chapter3: Model<any>,
    Chapter4: Model<any>,
    Chapter5: Model<any>,
    Chapter6: Model<any>,
    Chapter7: Model<any>
  ) {
    this.Chapter1 = Chapter1
    this.Chapter2 = Chapter2
    this.Chapter3 = Chapter3
    this.Chapter4 = Chapter4
    this.Chapter5 = Chapter5
    this.Chapter6 = Chapter6
    this.Chapter7 = Chapter7
  }

  public exportChapter1 = async (inputId: mongoose.Types.ObjectId) => {
    // Find chapter data and ensure it exists
    const chapter1 = await this.Chapter1.findOne({ inputId }).populate('engineId')
    if (!chapter1) {
      throw new Error('Chapter1 not found')
    }

    // Launch Puppeteer browser
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })

    try {
      const page = await browser.newPage()

      // Load the HTML template
      const htmlPath = path.resolve(__dirname, '../template/report.chapter1.html')
      const htmlContent = readFileSync(htmlPath, 'utf-8')
      await page.setContent(htmlContent, { waitUntil: 'domcontentloaded' })

      // Populate the template's DOM elements using the fetched data
      await page.evaluate((data) => {
        const engineCode = document.querySelector('.engine-code') as HTMLElement
        if (engineCode) engineCode.innerText = data.engineId.kieu_dong_co

        const enginePower = document.querySelector('.engine-power') as HTMLElement
        if (enginePower) enginePower.innerText = data.engineId.cong_suat_kW

        const engineSpeed = document.querySelector('.engine-speed') as HTMLElement
        if (engineSpeed) engineSpeed.innerText = data.engineId.van_toc_quay_vgph

        const engineOpen = document.querySelector('.engine-open') as HTMLElement
        if (engineOpen) engineOpen.innerText = data.engineId.ti_so_momen

        const P_dc = document.querySelector('.P_dc') as HTMLElement
        if (P_dc) P_dc.innerText = Number(data.P_dc).toFixed(3)

        const P_I = document.querySelector('.P_I') as HTMLElement
        if (P_I) P_I.innerText = Number(data.P_I).toFixed(3)

        const P_II = document.querySelector('.P_II') as HTMLElement
        if (P_II) P_II.innerText = Number(data.P_II).toFixed(3)

        const P_III = document.querySelector('.P_III') as HTMLElement
        if (P_III) P_III.innerText = Number(data.P_III).toFixed(3)

        const n_dc = document.querySelector('.n_dc') as HTMLElement
        if (n_dc) n_dc.innerText = Number(data.n_dc).toFixed(3)

        const n_I = document.querySelector('.n_I') as HTMLElement
        if (n_I) n_I.innerText = Number(data.n_I).toFixed(3)

        const n_II = document.querySelector('.n_II') as HTMLElement
        if (n_II) n_II.innerText = Number(data.n_II).toFixed(3)

        const n_III = document.querySelector('.n_III') as HTMLElement
        if (n_III) n_III.innerText = Number(data.n_III).toFixed(3)

        const u_dc = document.querySelector('.u_dc') as HTMLElement
        if (u_dc) u_dc.innerText = Number(data.u_dc).toFixed(3)

        const u_I_II = document.querySelector('.u_I_II') as HTMLElement
        if (u_I_II) u_I_II.innerText = Number(data.u_I_II).toFixed(3)

        const u_II_III = document.querySelector('.u_II_III') as HTMLElement
        if (u_II_III) u_II_III.innerText = Number(data.u_II_III).toFixed(3)

        const T_dc = document.querySelector('.T_dc') as HTMLElement
        if (T_dc) T_dc.innerText = Number(data.T_dc).toFixed(3)

        const T_I = document.querySelector('.T_I') as HTMLElement
        if (T_I) T_I.innerText = Number(data.T_I).toFixed(3)

        const T_II = document.querySelector('.T_II') as HTMLElement
        if (T_II) T_II.innerText = Number(data.T_II).toFixed(3)

        const T_III = document.querySelector('.T_III') as HTMLElement
        if (T_III) T_III.innerText = Number(data.T_III).toFixed(3)
      }, chapter1)

      // Generate PDF from page content
      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true
      })

      return pdfBuffer
    } finally {
      // Always close the browser to prevent orphan processes
      await browser.close()
    }
  }

  public exportChapter2 = async (inputId: mongoose.Types.ObjectId) => {
    const chapter2 = await this.Chapter2.findOne({ inputId })
    if (!chapter2) {
      throw new Error('Chapter2 not found')
    }

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })

    try {
      const page = await browser.newPage()

      const htmlPath = path.resolve(__dirname, '../template/report.chapter2.html')
      const htmlContent = readFileSync(htmlPath, 'utf-8')
      await page.setContent(htmlContent, { waitUntil: 'domcontentloaded' })

      // Optional: Log any errors or messages from within the browser context
      page.on('console', (msg) => {
        console.log('Browser log:', msg.text())
      })

      await page.evaluate((data) => {
        // Update the belt parameters table
        const beltParameter = document.querySelector('.belt-parameters') as HTMLTableElement
        if (beltParameter) {
          const rows = beltParameter.rows
          rows[1].cells[1].innerText = data.beltParamaters.d1
          rows[2].cells[1].innerText = data.beltParamaters.d2
          rows[3].cells[1].innerText = data.beltParamaters.a
          rows[4].cells[1].innerText = data.beltParamaters.L
          rows[5].cells[1].innerText = data.beltParamaters.goc_om_dai
          rows[6].cells[1].innerText = data.beltParamaters.z
          rows[7].cells[1].innerText = data.beltParamaters.B
          rows[8].cells[1].innerText = data.beltParamaters.F0
          rows[9].cells[1].innerText = data.beltParamaters.Fr
        }

        // Update the size of transmission tables
        const sizeOfTransmission1 = document.querySelector('.size-of-transmission-1') as HTMLTableElement
        if (sizeOfTransmission1) {
          const rows = sizeOfTransmission1.rows
          rows[2].cells[1].innerText = data.sizeOfTranmission.truc_vit.d1
          rows[3].cells[1].innerText = data.sizeOfTranmission.truc_vit.da1
          rows[4].cells[1].innerText = data.sizeOfTranmission.truc_vit.df1
          rows[5].cells[1].innerText = data.sizeOfTranmission.truc_vit.y
          rows[6].cells[1].innerText = data.sizeOfTranmission.truc_vit.b1
        }

        const sizeOfTransmission = document.querySelector('.size-of-transmission') as HTMLTableElement
        if (sizeOfTransmission) {
          const rows = sizeOfTransmission.rows
          rows[2].cells[1].innerText = data.sizeOfTranmission.banh_vit.d2
          rows[3].cells[1].innerText = data.sizeOfTranmission.banh_vit.da2
          rows[4].cells[1].innerText = data.sizeOfTranmission.banh_vit.df2
          rows[5].cells[1].innerText = data.sizeOfTranmission.banh_vit.aw
          rows[6].cells[1].innerText = data.sizeOfTranmission.banh_vit.daM2
          rows[7].cells[1].innerText = data.sizeOfTranmission.banh_vit.b2
        }

        // Update the gear specification table
        const gearSpecification = document.querySelector('.gear-specification') as HTMLTableElement
        if (gearSpecification) {
          const rows = gearSpecification.rows
          rows[1].cells[1].innerText = data.gearSpecification.d1
          rows[1].cells[2].innerText = data.gearSpecification.d2
          rows[2].cells[1].innerText = data.gearSpecification.da1
          rows[2].cells[2].innerText = data.gearSpecification.da2
          rows[3].cells[1].innerText = data.gearSpecification.dw1
          rows[3].cells[2].innerText = data.gearSpecification.dw2
          rows[4].cells[1].innerText = data.gearSpecification.df1
          rows[4].cells[2].innerText = data.gearSpecification.df2
          rows[5].cells[1].innerText = data.gearSpecification.awx
          rows[6].cells[1].innerText = data.gearSpecification.bw
        }
      }, chapter2)

      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true
      })

      return pdfBuffer
    } finally {
      await browser.close()
    }
  }

  public exportChapter3 = async (inputId: mongoose.Types.ObjectId) => {
    const chapter3 = await this.Chapter3.findOne({ inputId })
    if (!chapter3) {
      throw new Error('Chapter3 not found')
    }

    // Launch Puppeteer browser
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })

    try {
      const page = await browser.newPage()

      // Load the HTML template
      const htmlPath = path.resolve(__dirname, '../template/report.chapter3.html')
      const htmlContent = readFileSync(htmlPath, 'utf-8')
      await page.setContent(htmlContent, { waitUntil: 'domcontentloaded' })

      // Populate the template's DOM elements using the fetched data
      await page.evaluate((data) => {
        const firstTable = document.querySelector('.first table') as HTMLTableElement
        const secondTable = document.querySelector('.second table') as HTMLTableElement
        const thirdTable = document.querySelector('.third table') as HTMLTableElement

        if (firstTable) {
          const rows = firstTable.rows
          rows[1].cells[0].innerText = 'B'
          rows[1].cells[1].innerText = data.dsb1
          rows[1].cells[2].innerText = `${data.bB} x ${data.hB}`
          rows[1].cells[3].innerText = data.t1B
          rows[1].cells[4].innerText = data.WB.toFixed(2)
          rows[1].cells[5].innerText = data.WB0.toFixed(2)

          rows[2].cells[0].innerText = 'F'
          rows[2].cells[1].innerText = data.dsb2
          rows[2].cells[2].innerText = `${data.bF} x ${data.hF}`
          rows[2].cells[3].innerText = data.t1F
          rows[2].cells[4].innerText = data.WF.toFixed(2)
          rows[2].cells[5].innerText = data.WF0.toFixed(2)

          rows[3].cells[0].innerText = 'N'
          rows[3].cells[1].innerText = data.dsb3
          rows[3].cells[2].innerText = `${data.bN} x ${data.hN}`
          rows[3].cells[3].innerText = data.t1N
          rows[3].cells[4].innerText = data.WN.toFixed(2)
          rows[3].cells[5].innerText = data.WN0.toFixed(2)
        }

        if (secondTable) {
          const rows = secondTable.rows
          rows[1].cells[0].innerText = 'B'
          rows[1].cells[1].innerText = data.usaB.toFixed(2)
          rows[1].cells[2].innerText = '0'
          rows[1].cells[3].innerText = data.taB.toFixed(2)

          rows[2].cells[0].innerText = 'F'
          rows[2].cells[1].innerText = data.usaF.toFixed(2)
          rows[2].cells[2].innerText = '0'
          rows[2].cells[3].innerText = data.taF.toFixed(2)

          rows[3].cells[0].innerText = 'N'
          rows[3].cells[1].innerText = data.usaN.toFixed(2)
          rows[3].cells[2].innerText = '0'
          rows[3].cells[3].innerText = data.taN.toFixed(2)
        }

        if (thirdTable) {
          const rows = thirdTable.rows
          rows[1].cells[0].innerText = 'B'
          rows[1].cells[1].innerText = data.dsb1
          rows[1].cells[2].innerText = data.eoB
          rows[1].cells[3].innerText = data.etB
          rows[1].cells[4].innerText = data.KoBEoB.toFixed(2)
          rows[1].cells[5].innerText = data.KtBEtB.toFixed(2)
          rows[1].cells[6].innerText = data.soB.toFixed(2)
          rows[1].cells[7].innerText = data.stB.toFixed(2)
          rows[1].cells[8].innerText = data.sB.toFixed(2)

          rows[2].cells[0].innerText = 'F'
          rows[2].cells[1].innerText = data.dsb2
          rows[2].cells[2].innerText = data.eoF
          rows[2].cells[3].innerText = data.etF
          rows[2].cells[4].innerText = data.KoBEoF.toFixed(2)
          rows[2].cells[5].innerText = data.KtBEtF.toFixed(2)
          rows[2].cells[6].innerText = data.soF.toFixed(2)
          rows[2].cells[7].innerText = data.stF.toFixed(2)
          rows[2].cells[8].innerText = data.sF.toFixed(2)

          rows[3].cells[0].innerText = 'N'
          rows[3].cells[1].innerText = data.dsb3
          rows[3].cells[2].innerText = data.eoN
          rows[3].cells[3].innerText = data.etN
          rows[3].cells[4].innerText = data.KoBEoN.toFixed(2)
          rows[3].cells[5].innerText = data.KtBEtN.toFixed(2)
          rows[3].cells[6].innerText = data.soN.toFixed(2)
          rows[3].cells[7].innerText = data.stN.toFixed(2)
          rows[3].cells[8].innerText = data.sN.toFixed(2)
        }
      }, chapter3)

      // Generate PDF from page content
      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true
      })

      return pdfBuffer
    } finally {
      // Always close the browser to prevent orphan processes
      await browser.close()
    }
  }

  public exportChapter4 = async (inputId: mongoose.Types.ObjectId) => {
    const chapter4 = await this.Chapter4.findOne({ inputId })

    console.log(chapter4)

    if (!chapter4) {
      throw new Error('Chapter4 not found')
    }

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })

    try {
      const page = await browser.newPage()

      const htmlPath = path.resolve(__dirname, '../template/report.chapter4.html')
      const htmlContent = readFileSync(htmlPath, 'utf-8')
      await page.setContent(htmlContent, { waitUntil: 'domcontentloaded' })

      // Optional: Log any errors or messages from within the browser context
      page.on('console', (msg) => {
        console.log('Browser log:', msg.text())
      })

      await page.evaluate((data) => {
        const firstTable = document.querySelector('.first') as HTMLTableElement
        if (firstTable) {
          const rows = firstTable.rows
          rows[1].cells[0].innerText = data.trucI.vitriA.code
          rows[1].cells[1].innerText = data.trucI.vitriA.d
          rows[1].cells[2].innerText = data.trucI.vitriA.D
          rows[1].cells[3].innerText = data.trucI.vitriA.D1
          rows[1].cells[4].innerText = data.trucI.vitriA.d1
          rows[1].cells[5].innerText = data.trucI.vitriA.B
          rows[1].cells[6].innerText = data.trucI.vitriA.C1
          rows[1].cells[7].innerText = data.trucI.vitriA.T
          rows[1].cells[8].innerText = data.trucI.vitriA.r
          rows[1].cells[9].innerText = data.trucI.vitriA.r1
          rows[1].cells[10].innerText = data.trucI.vitriA.alpha
          rows[1].cells[11].innerText = data.trucI.vitriA.C
          rows[1].cells[12].innerText = data.trucI.vitriA.C0
        }

        const secondTable = document.querySelector('.second') as HTMLTableElement
        if (secondTable) {
          const rows = secondTable.rows
          rows[1].cells[0].innerText = data.trucI.vitriC.code
          rows[1].cells[1].innerText = data.trucI.vitriC.d
          rows[1].cells[2].innerText = data.trucI.vitriC.D
          rows[1].cells[3].innerText = data.trucI.vitriC.B
          rows[1].cells[4].innerText = data.trucI.vitriC.r
          rows[1].cells[5].innerText = data.trucI.vitriC.r1
          rows[1].cells[6].innerText = data.trucI.vitriC.C
          rows[1].cells[7].innerText = data.trucI.vitriC.C0
          rows[1].cells[8].innerText = data.trucI.vitriC.duongKinhChieuDaiConLan
        }

        const thirdTable = document.querySelector('.third') as HTMLTableElement
        if (thirdTable) {
          const rows = thirdTable.rows
          rows[1].cells[0].innerText = data.trucII.code
          rows[1].cells[1].innerText = data.trucII.d2
          rows[1].cells[2].innerText = data.trucII.D2
          rows[1].cells[3].innerText = data.trucII.D1_2
          rows[1].cells[4].innerText = data.trucII.d1_2
          rows[1].cells[5].innerText = data.trucII.B2
          rows[1].cells[6].innerText = data.trucII.C1_2
          rows[1].cells[7].innerText = data.trucII.T2
          rows[1].cells[8].innerText = data.trucII.r2
          rows[1].cells[9].innerText = data.trucII.r1_2
          rows[1].cells[10].innerText = data.trucII.alpha_2
          rows[1].cells[11].innerText = data.trucII.C
          rows[1].cells[12].innerText = data.trucII.C0
        }

        const fourthTable = document.querySelector('.fourth') as HTMLTableElement
        if (fourthTable) {
          const rows = fourthTable.rows
          rows[1].cells[0].innerText = data.trucIII.code
          rows[1].cells[1].innerText = data.trucIII.d
          rows[1].cells[2].innerText = data.trucIII.D
          rows[1].cells[3].innerText = data.trucIII.B
          rows[1].cells[4].innerText = data.trucIII.r
          rows[1].cells[5].innerText = data.trucIII.ballDiameter
          rows[1].cells[6].innerText = data.trucIII.C
          rows[1].cells[7].innerText = data.trucIII.C0
        }
      }, chapter4)

      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true
      })

      return pdfBuffer
    } finally {
      await browser.close()
    }
  }

  public exportChapter5 = async (inputId: mongoose.Types.ObjectId) => {
    const chapter5 = await this.Chapter5.findOne({ inputId })
    if (!chapter5) {
      throw new Error('Chapter5 not found')
    }

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })

    try {
      const page = await browser.newPage()

      const htmlPath = path.resolve(__dirname, '../template/report.chapter5.html')
      const htmlContent = readFileSync(htmlPath, 'utf-8')
      await page.setContent(htmlContent, { waitUntil: 'domcontentloaded' })

      // Optional: Log any errors or messages from within the browser context
      page.on('console', (msg) => {
        console.log('Browser log:', msg.text())
      })

      await page.evaluate((data) => {
        const firstTable = document.querySelector('.first') as HTMLTableElement
        if (firstTable) {
          const rows = firstTable.rows
          rows[1].cells[1].innerText = `${data.thanHop_o} mm`
          rows[2].cells[1].innerText = `${data.napHop_o1} mm`
          rows[3].cells[1].innerText = `${data.chieuDaiGan_e} mm`
          rows[4].cells[1].innerText = `${data.chieuCaoGan_h} mm`
          rows[5].cells[1].innerText = `Khoảng 2°`
          rows[6].cells[1].innerText = `${data.duongKinhBulongNen_d1} mm`
          rows[7].cells[1].innerText = `${data.duongKinhBulongNen_d2} mm (Bulong M20)`
          rows[8].cells[1].innerText = `${data.duongKinhBulongNapVaThan_d3} mm (Bulong M18)`
          rows[9].cells[1].innerText = `${data.duongKinhBulongNapO_d4} mm (Bulong M12)`
          rows[10].cells[1].innerText = `${data.duongKinhBulongNapCuaTham_d5} mm (Bulong M12)`
          rows[11].cells[1].innerText = `${data.duongKinhNgoaiLoVit_D3} mm`
          rows[12].cells[1].innerText = `${data.duongKinhTamLoVit_D2} mm`
          rows[13].cells[1].innerText = `${data.beRongMatLapGhep_K2} mm`
          rows[14].cells[1].innerText = `E₂ = ${data.tamLoBulongCanhLo_E2} mm, C = ${data.duongKinhNgoaiLoVit_D3 / 2} mm`
          rows[15].cells[1].innerText = `h xác định theo kết cấu, phụ thuộc tâm lỗ bulong và kích thước mặt tựa`
          rows[16].cells[1].innerText = `${data.chieuDayBichThanHop_S3} mm`
          rows[17].cells[1].innerText = `${data.chieuDayBichNapHop_S4} mm`
          rows[18].cells[1].innerText = `${data.beRongBichNapHop_K3} mm`
          rows[19].cells[1].innerText = `${data.chieuDayMatDeKoCoPhanLoi_S1} mm`
          rows[20].cells[1].innerText = `D₄ được xác định theo đường kính dao khoét; S₁ = ${data.chieuDayMatDeCoPhanLoi_S1Loi} mm; S₂ = ${data.chieuDayMatDeCoPhanLoi_S2Loi} mm`
          rows[21].cells[1].innerText = `${data.kheHoGiuaBanhRangVaThanhTrongHop_denta} mm`
          rows[22].cells[1].innerText = `${data.kheHoGiuaDinhBanhRangLonVoiDayHop_denta1} mm`
          rows[23].cells[1].innerText = `${data.kheHoGiuaMatBenCacChiTiet_denta2} mm`
          rows[24].cells[1].innerText = `Z = ${data.soLuongBuLongTrenNen_Z}`
        }

        const secondTable = document.querySelector('.second') as HTMLTableElement
        if (secondTable) {
          const rows = secondTable.rows
          const cells = rows[1].cells
          cells[0].innerText = data.kichthuocnapquansat.A
          cells[1].innerText = data.kichthuocnapquansat.B
          cells[2].innerText = data.kichthuocnapquansat.A1
          cells[3].innerText = data.kichthuocnapquansat.B1
          cells[4].innerText = data.kichthuocnapquansat.C
          cells[5].innerText = data.kichthuocnapquansat.C1 || '-'
          cells[6].innerText = data.kichthuocnapquansat.K
          cells[7].innerText = data.kichthuocnapquansat.R
          cells[8].innerText = data.kichthuocnapquansat.Vit
          cells[9].innerText = data.kichthuocnapquansat.Soluong
        }

        const thirdTable = document.querySelector('.third') as HTMLTableElement
        if (thirdTable) {
          const rows = thirdTable.rows
          const cells = rows[1].cells
          cells[0].innerText = data.kichthuocnutthonghoi.A
          cells[1].innerText = data.kichthuocnutthonghoi.B
          cells[2].innerText = data.kichthuocnutthonghoi.C
          cells[3].innerText = data.kichthuocnutthonghoi.D
          cells[4].innerText = data.kichthuocnutthonghoi.E
          cells[5].innerText = data.kichthuocnutthonghoi.G
          cells[6].innerText = data.kichthuocnutthonghoi.H
          cells[7].innerText = data.kichthuocnutthonghoi.I
          cells[8].innerText = data.kichthuocnutthonghoi.K
          cells[9].innerText = data.kichthuocnutthonghoi.L
          cells[10].innerText = data.kichthuocnutthonghoi.M
          cells[11].innerText = data.kichthuocnutthonghoi.N
          cells[12].innerText = data.kichthuocnutthonghoi.O
          cells[13].innerText = data.kichthuocnutthonghoi.P
          cells[14].innerText = data.kichthuocnutthonghoi.Q
          cells[15].innerText = data.kichthuocnutthonghoi.R
          cells[16].innerText = data.kichthuocnutthonghoi.S
        }

        const fourthTable = document.querySelector('.fourth') as HTMLTableElement
        if (fourthTable) {
          const rows = fourthTable.rows
          const cells = rows[1].cells
          cells[0].innerText = data.kichthuocnutthaodau.d
          cells[1].innerText = data.kichthuocnutthaodau.b
          cells[2].innerText = data.kichthuocnutthaodau.m
          cells[3].innerText = data.kichthuocnutthaodau.f
          cells[4].innerText = data.kichthuocnutthaodau.L
          cells[5].innerText = data.kichthuocnutthaodau.c
          cells[6].innerText = data.kichthuocnutthaodau.q
          cells[7].innerText = data.kichthuocnutthaodau.D
          cells[8].innerText = data.kichthuocnutthaodau.S
          cells[9].innerText = data.kichthuocnutthaodau.D0
        }

        const fifthTable = document.querySelector('.fifth') as HTMLTableElement
        if (fifthTable) {
          const rows = fifthTable.rows
          const cells = rows[1].cells
          cells[0].innerText = data.trucI.truc
          cells[1].innerText = data.trucI["D'"]
          cells[2].innerText = data.trucI.D2
          cells[3].innerText = data.trucI.D3
        }

        const sixthTable = document.querySelector('.sixth') as HTMLTableElement
        if (sixthTable) {
          const rows = sixthTable.rows
          const cells = rows[1].cells
          cells[0].innerText = data.kichthuocbulong.d
          cells[1].innerText = data.kichthuocbulong.d1
          cells[2].innerText = data.kichthuocbulong.d2
          cells[3].innerText = data.kichthuocbulong.d3
          cells[4].innerText = data.kichthuocbulong.d4
          cells[5].innerText = data.kichthuocbulong.d5
          cells[6].innerText = data.kichthuocbulong.h
          cells[7].innerText = data.kichthuocbulong.h1
          cells[8].innerText = data.kichthuocbulong.h2
          cells[9].innerText = data.kichthuocbulong.I
          cells[10].innerText = data.kichthuocbulong.f
          cells[11].innerText = data.kichthuocbulong.b
          cells[12].innerText = data.kichthuocbulong.c
          cells[13].innerText = data.kichthuocbulong.x
          cells[14].innerText = data.kichthuocbulong.r
          cells[15].innerText = data.kichthuocbulong.r1
          cells[16].innerText = data.kichthuocbulong.r2
          cells[17].innerText = `a = ${data.kichthuocbulong.trongluong.a}, b = ${data.kichthuocbulong.trongluong.b}, c = ${data.kichthuocbulong.trongluong.c}`
        }

        const seventhTable = document.querySelector('.seventh') as HTMLTableElement
        if (seventhTable) {
          const rows = seventhTable.rows
          const cells = rows[1].cells
          cells[0].innerText = data.kichthuocnoitrucdanhoi.T
          cells[1].innerText = data.kichthuocnoitrucdanhoi.d
          cells[2].innerText = data.kichthuocnoitrucdanhoi.D
          cells[3].innerText = data.kichthuocnoitrucdanhoi.dm
          cells[4].innerText = data.kichthuocnoitrucdanhoi.L
          cells[5].innerText = data.kichthuocnoitrucdanhoi.I
          cells[6].innerText = data.kichthuocnoitrucdanhoi.d1
          cells[7].innerText = data.kichthuocnoitrucdanhoi.Do
          cells[8].innerText = data.kichthuocnoitrucdanhoi.Z
          cells[9].innerText = data.kichthuocnoitrucdanhoi.nmax
          cells[10].innerText = data.kichthuocnoitrucdanhoi.B
          cells[11].innerText = data.kichthuocnoitrucdanhoi.B1
          cells[12].innerText = data.kichthuocnoitrucdanhoi.I1
          cells[13].innerText = data.kichthuocnoitrucdanhoi.D3
          cells[14].innerText = data.kichthuocnoitrucdanhoi.I2
        }

        const eighthTable = document.querySelector('.eighth') as HTMLTableElement
        if (eighthTable) {
          const rows = eighthTable.rows
          const cells = rows[1].cells
          cells[0].innerText = data.kichthuocvongdanhoi.T
          cells[1].innerText = data.kichthuocvongdanhoi.de
          cells[2].innerText = data.kichthuocvongdanhoi.d1
          cells[3].innerText = data.kichthuocvongdanhoi.D2
          cells[4].innerText = data.kichthuocvongdanhoi.I
          cells[5].innerText = data.kichthuocvongdanhoi.I1
          cells[6].innerText = data.kichthuocvongdanhoi.I2
          cells[7].innerText = data.kichthuocvongdanhoi.h
        }
      }, chapter5)

      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true
      })

      return pdfBuffer
    } catch (error) {
      console.error('Error exporting chapter 5:', error)
      throw error
    } finally {
      await browser.close()
    }
  }

  public exportChapter6 = async (inputId: mongoose.Types.ObjectId) => {
    const chapter6 = await this.Chapter6.findOne({ inputId })
    if (!chapter6) {
      throw new Error('Chapter6 not found')
    }

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })

    try {
      const page = await browser.newPage()

      const htmlPath = path.resolve(__dirname, '../template/report.chapter6.html')
      const htmlContent = readFileSync(htmlPath, 'utf-8')
      await page.setContent(htmlContent, { waitUntil: 'domcontentloaded' })

      // Optional: Log any errors or messages from within the browser context
      page.on('console', (msg) => {
        console.log('Browser log:', msg.text())
      })

      await page.evaluate((data) => {
        const firstTable = document.querySelector('.first') as HTMLTableElement
        if (firstTable) {
          const rows = firstTable.rows
          rows[1].cells[0].innerText = data.lubricationTable[0].name
          rows[1].cells[1].innerText = data.lubricationTable[0].application
          rows[1].cells[2].innerText = data.lubricationTable[0].quantity
          rows[1].cells[3].innerText = data.lubricationTable[0].replacementTime
          rows[2].cells[0].innerText = data.lubricationTable[1].name
          rows[2].cells[1].innerText = data.lubricationTable[1].application
          rows[2].cells[2].innerText = data.lubricationTable[1].quantity
          rows[2].cells[3].innerText = data.lubricationTable[1].replacementTime
        }
      }, chapter6)

      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true
      })

      return pdfBuffer
    } catch (error) {
      console.error('Error exporting chapter 6:', error)
      throw error
    } finally {
      await browser.close()
    }
  }

  public exportChapter7 = async (inputId: mongoose.Types.ObjectId) => {
    const chapter7 = await this.Chapter7.findOne({ inputId })
    if (!chapter7) {
      throw new Error('Chapter7 not found')
    }

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })

    try {
      const page = await browser.newPage()

      const htmlPath = path.resolve(__dirname, '../template/report.chapter7.html')
      const htmlContent = readFileSync(htmlPath, 'utf-8')
      await page.setContent(htmlContent, { waitUntil: 'domcontentloaded' })

      // Optional: Log any errors or messages from within the browser context
      page.on('console', (msg) => {
        console.log('Browser log:', msg.text())
      })

      await page.evaluate((data) => {
        const firstTable = document.querySelector('.first') as HTMLTableElement
        if (firstTable) {
          const rows = firstTable.rows

          // Row 1
          rows[2].cells[0].innerText = '1'
          rows[2].cells[1].innerText = data.fitData[0].fitType
          rows[2].cells[2].innerText = '-'
          rows[2].cells[3].innerText = '-'
          rows[2].cells[4].innerText = data.fitData[0].shaftFits[0].diameter
          rows[2].cells[5].innerText = `${data.fitData[0].shaftFits[0].tolerance[0]} | ${data.fitData[0].shaftFits[0].tolerance[1]}`
          rows[2].cells[6].innerText = data.fitData[0].shaftFits[1].diameter
          rows[2].cells[7].innerText = `${data.fitData[0].shaftFits[1].tolerance[0]} | ${data.fitData[0].shaftFits[1].tolerance[1]}`

          // Row 2
          rows[3].cells[0].innerText = '2'
          rows[3].cells[1].innerText = data.fitData[1].fitType
          rows[3].cells[2].innerText = '-'
          rows[3].cells[3].innerText = '-'
          rows[3].cells[4].innerText = data.fitData[1].shaftFits[0].diameter
          rows[3].cells[5].innerText = `${data.fitData[1].shaftFits[0].tolerance[0]} | ${data.fitData[1].shaftFits[0].tolerance[1]}`
          rows[3].cells[6].innerText = '-'
          rows[3].cells[7].innerText = '-'

          // Row 3
          rows[4].cells[0].innerText = '3'
          rows[4].cells[1].innerText = data.fitData[2].fitType
          rows[4].cells[2].innerText = data.fitData[2].shaftFits[0].diameter
          rows[4].cells[3].innerText = `${data.fitData[2].shaftFits[0].tolerance[0]} | ${data.fitData[2].shaftFits[0].tolerance[1]}`
          rows[4].cells[4].innerText = data.fitData[2].shaftFits[1].diameter
          rows[4].cells[5].innerText = data.fitData[2].shaftFits[1].tolerance[0]
          rows[4].cells[6].innerText = data.fitData[2].shaftFits[2].diameter
          rows[4].cells[7].innerText = data.fitData[2].shaftFits[2].tolerance[0]

          // Row 4
          rows[5].cells[0].innerText = '4'
          rows[5].cells[1].innerText = data.fitData[3].fitType
          rows[5].cells[2].innerText = data.fitData[3].shaftFits[0].diameter
          rows[5].cells[3].innerText = data.fitData[3].shaftFits[0].tolerance[0]
          rows[5].cells[4].innerText = data.fitData[3].shaftFits[1].diameter
          rows[5].cells[5].innerText = data.fitData[3].shaftFits[1].tolerance[0]
          rows[5].cells[6].innerText = data.fitData[3].shaftFits[2].diameter
          rows[5].cells[7].innerText = data.fitData[3].shaftFits[2].tolerance[0]

          // Row 5
          rows[6].cells[0].innerText = '5'
          rows[6].cells[1].innerText = data.fitData[4].fitType
          rows[6].cells[2].innerText = data.fitData[4].shaftFits[0].diameter
          rows[6].cells[3].innerText = data.fitData[4].shaftFits[0].tolerance[0]
          rows[6].cells[4].innerText = data.fitData[4].shaftFits[1]?.diameter
            ? data.fitData[4].shaftFits[1].diameter
            : '-'
          rows[6].cells[5].innerText = data.fitData[4].shaftFits[1]?.tolerance[0]
            ? data.fitData[4].shaftFits[1].tolerance[0]
            : '-'
          rows[6].cells[6].innerText = data.fitData[4].shaftFits[2]?.diameter
            ? data.fitData[4].shaftFits[2].diameter
            : '-'
          rows[6].cells[7].innerText = data.fitData[4].shaftFits[2]?.tolerance[0]
            ? data.fitData[4].shaftFits[2].tolerance[0]
            : '-'

          // Row 6
          rows[7].cells[0].innerText = '6'
          rows[7].cells[1].innerText = data.fitData[5].fitType
          rows[7].cells[2].innerText = '-'
          rows[7].cells[3].innerText = data.fitData[5].shaftFits[0].tolerance[0]
          rows[7].cells[4].innerText = '-'
          rows[7].cells[5].innerText = '-'
          rows[7].cells[6].innerText = '-'
          rows[7].cells[7].innerText = '-'
        }
      }, chapter7)

      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true
      })

      return pdfBuffer
    } catch (error) {
      console.error('Error exporting chapter 7:', error)
      throw error
    } finally {
      await browser.close()
    }
  }
}
