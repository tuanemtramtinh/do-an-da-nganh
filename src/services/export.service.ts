import { readFileSync } from 'fs'
import mongoose, { Model } from 'mongoose'
import path from 'path'
import puppeteer from 'puppeteer'

export class ExportService {
  private Chapter1: Model<any>
  private Chapter2: Model<any>
  private Chapter3: Model<any>

  constructor(Chapter1: Model<any>, Chapter2: Model<any>, Chapter3: Model<any>) {
    this.Chapter1 = Chapter1
    this.Chapter2 = Chapter2
    this.Chapter3 = Chapter3
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
          rows[1].cells[2].innerText = data.gearSpecification.d1
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
}
