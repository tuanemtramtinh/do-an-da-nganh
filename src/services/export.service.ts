import { readFileSync } from 'fs'
import mongoose, { Model } from 'mongoose'
import path from 'path'
import puppeteer from 'puppeteer'
import Chapter1 from '~/models/chapter1.model'

export class ExportService {
  private Chapter1

  constructor(Chapter1: Model<any>) {
    this.Chapter1 = Chapter1
  }

  // public exportPdf = async (data: any) => {

  // }

  public exportChapter1 = async (inputId: mongoose.Schema.Types.ObjectId) => {
    const chapter1 = await this.Chapter1.findOne({
      inputId: inputId
    }).populate('engineId')

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })

    const page = await browser.newPage()

    const htmlPath = path.resolve(__dirname, '../template/report.chapter1.html') // Go up one directory and look for reportTemplate.html
    const htmlContent = readFileSync(htmlPath, 'utf-8')

    await page.setContent(htmlContent, { waitUntil: 'domcontentloaded' })

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

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true
    })

    return pdfBuffer
  }
}
