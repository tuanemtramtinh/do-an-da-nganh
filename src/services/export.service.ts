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

    const htmlContent = `
    <html lang="vi">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Báo Cáo Chương 1</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
            padding: 20px;
            position: relative;
          }
          .header,
          .footer {
            text-align: center;
            padding: 10px;
            background-color: #f4f4f4;
            position: fixed;
            width: 100%;
          }
          .header {
            top: 0;
            left: 0;
          }
          .footer {
            bottom: 0;
            left: 0;
          }
          .report-container {
            max-width: 800px;
            margin: 60px auto 60px;
            padding: 20px;
            border: 1px solid #ddd;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            background: white;
          }
          h1,
          h2 {
            text-align: center;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          table,
          th,
          td {
            border: 1px solid #ddd;
            text-align: left;
            padding: 8px;
          }
          th {
            background-color: #f4f4f4;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h2>Công ty Partify - Báo Cáo Chọn Động Cơ Điện</h2>
        </div>

        <div class="report-container">
          <h1>BÁO CÁO</h1>

          <h2>Mục 1: Động cơ phù hợp</h2>
          <table>
            <tr>
              <th>Mã số động cơ</th>
              <th>Công suất (kW)</th>
              <th>Vận tốc (vg/phút)</th>
              <th>Hiệu suất (%)</th>
            </tr>
            <tr>
              <td class="engine-code">DC1234</td>
              <td class="engine-power">15</td>
              <td class="engine-speed">1500</td>
              <td class="engine-open">92</td>
            </tr>
          </table>

          <h2>Mục 2: Kết quả tính toán</h2>
          <table>
            <thead>
              <tr>
                <th>Thông số</th>
                <th>Động cơ</th>
                <th>Trục I</th>
                <th colspan="2">Trục II</th>
                <th colspan="2">Trục II</th>
                <th colspan="2">Trục III</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>P (kW)</td>
                <td class="P_dc">10.5</td>
                <td class="P_I">8.2</td>
                <td class="P_II" colspan="4">7.5</td>
                <td class="P_III">6.9</td>
              </tr>
              <tr>
                <td>n (vg/phút)</td>
                <td class="n_dc">1450</td>
                <td class="n_I">1350</td>
                <td class="n_II" colspan="4">1300</td>
                <td class="n_III">1250</td>
              </tr>
              <tr>
                <td>u</td>
                <td class="u_dc">1.5</td>
                <td class="u_I_II" colspan="3">2.0</td>
                <td class="u_II_III" colspan="3">2.2</td>
              </tr>
              <tr>
                <td>T (N.mm)</td>
                <td class="T_dc">320</td>
                <td class="T_I">290</td>
                <td class="T_II" colspan="4">275</td>
                <td class="T_III">260</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="footer">
          <p>© 2025 Công ty Partify - Mọi quyền được bảo lưu.</p>
        </div>
      </body>
    </html>
    `

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
