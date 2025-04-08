import { readFileSync } from 'fs'
import mongoose, { Model } from 'mongoose'
import path from 'path'
import puppeteer from 'puppeteer'
import Chapter1 from '~/models/chapter1.model'
import Chapter2 from '../models/chapter2.model'

export class ExportService {
  private Chapter1: Model<any>
  private Chapter2: Model<any>

  constructor(Chapter1: Model<any>, Chapter2: Model<any>) {
    this.Chapter1 = Chapter1
    this.Chapter2 = Chapter2
  }

  public exportChapter1 = async (inputId: mongoose.Types.ObjectId) => {
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

  public exportChapter2 = async (inputId: mongoose.Types.ObjectId) => {
    const chapter2 = await this.Chapter2.findOne({
      inputId: inputId
    })

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })

    const page = await browser.newPage()

    const htmlPath = path.resolve(__dirname, '../template/report.chapter2.html') // Go up one directory and look for reportTemplate.html
    const htmlContent = readFileSync(htmlPath, 'utf-8')

    await page.setContent(htmlContent, { waitUntil: 'domcontentloaded' })

    page.on('console', (msg) => {
      console.log('Browser log:', msg.text())
    })

    await page.evaluate((data) => {
      const beltParameter = document.querySelector('.belt-parameters') as HTMLTableElement
      const sizeOfTransmission1 = document.querySelector('.size-of-transmission-1') as HTMLTableElement
      const sizeOfTransmission = document.querySelector('.size-of-transmission') as HTMLTableElement
      const gearSpecification = document.querySelector('.gear-specification') as HTMLTableElement

      const beltParameterRow = beltParameter.rows
      beltParameterRow[1].cells[1].innerText = data.beltParamaters.d1
      beltParameterRow[2].cells[1].innerText = data.beltParamaters.d2
      beltParameterRow[3].cells[1].innerText = data.beltParamaters.a
      beltParameterRow[4].cells[1].innerText = data.beltParamaters.L
      beltParameterRow[5].cells[1].innerText = data.beltParamaters.goc_om_dai
      beltParameterRow[6].cells[1].innerText = data.beltParamaters.z
      beltParameterRow[7].cells[1].innerText = data.beltParamaters.B
      beltParameterRow[8].cells[1].innerText = data.beltParamaters.F0
      beltParameterRow[9].cells[1].innerText = data.beltParamaters.Fr

      const sizeOfTransmission1Row = sizeOfTransmission1.rows
      sizeOfTransmission1Row[2].cells[1].innerText = data.sizeOfTranmission.truc_vit.d1
      sizeOfTransmission1Row[3].cells[1].innerText = data.sizeOfTranmission.truc_vit.da1
      sizeOfTransmission1Row[4].cells[1].innerText = data.sizeOfTranmission.truc_vit.df1
      sizeOfTransmission1Row[5].cells[1].innerText = data.sizeOfTranmission.truc_vit.y
      sizeOfTransmission1Row[6].cells[1].innerText = data.sizeOfTranmission.truc_vit.b1

      const sizeOfTransmissionRow = sizeOfTransmission.rows
      sizeOfTransmissionRow[2].cells[1].innerText = data.sizeOfTranmission.banh_vit.d2
      sizeOfTransmissionRow[3].cells[1].innerText = data.sizeOfTranmission.banh_vit.da2
      sizeOfTransmissionRow[4].cells[1].innerText = data.sizeOfTranmission.banh_vit.df2
      sizeOfTransmissionRow[5].cells[1].innerText = data.sizeOfTranmission.banh_vit.aw
      sizeOfTransmissionRow[6].cells[1].innerText = data.sizeOfTranmission.banh_vit.daM2
      sizeOfTransmissionRow[7].cells[1].innerText = data.sizeOfTranmission.banh_vit.b2

      const gearSpecificationRow = gearSpecification.rows
      gearSpecificationRow[1].cells[1].innerText = data.gearSpecification.d1
      gearSpecificationRow[1].cells[2].innerText = data.gearSpecification.d1
      gearSpecificationRow[2].cells[1].innerText = data.gearSpecification.da1
      gearSpecificationRow[2].cells[2].innerText = data.gearSpecification.da2
      gearSpecificationRow[3].cells[1].innerText = data.gearSpecification.dw1
      gearSpecificationRow[3].cells[2].innerText = data.gearSpecification.dw2
      gearSpecificationRow[4].cells[1].innerText = data.gearSpecification.df1
      gearSpecificationRow[4].cells[2].innerText = data.gearSpecification.df2
      gearSpecificationRow[5].cells[1].innerText = data.gearSpecification.awx
      gearSpecificationRow[6].cells[1].innerText = data.gearSpecification.bw
    }, chapter2)

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true
    })

    return pdfBuffer
  }
}
