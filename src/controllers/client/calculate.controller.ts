import { Request, Response } from 'express'
import { CalculateService } from '~/services/calculate.service'
import { Controller } from '../index.controller'
import mongoose from 'mongoose'
import OpenAI from 'openai'
import dotenv from 'dotenv'

dotenv.config()

export class CalculateController extends Controller {
  private calculateService: CalculateService

  constructor(calculateService: CalculateService) {
    super()
    this.calculateService = calculateService
  }

  public saveInput = async (req: Request, res: Response) => {
    const data = {
      ...req.body,
      userId: req.user?._id
    }
    const result = await this.calculateService.saveInput(data)
    this.successMessage(res, 'Lưu dữ liệu input thành công', result)
  }

  public getInput = async (req: Request, res: Response) => {
    try {
      const inputId = req.query.inputId

      if (typeof inputId !== 'string' || !mongoose.Types.ObjectId.isValid(inputId)) {
        this.failedMessage(res, 'Invalid inputId')
        return
      }
      const inputObjectId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(inputId)
      const input = await this.calculateService.getInput(inputObjectId)
      this.successMessage(res, 'Lấy input thành công', input)
    } catch (error: any) {
      this.failedMessage(res, error.message)
    }
  }

  public uploadInputImage = async (req: Request, res: Response) => {
    if (!req.file) {
      this.failedMessage(res, 'Bạn phải upload file image với field "image".')
      return
    }
    try {
      const openai = new OpenAI({
        apiKey: process.env.OPEN_API_KEY
      })
      const imgBase64 = req.file?.buffer.toString('base64')
      const resp = await openai.chat.completions.create({
        model: 'gpt-4o-mini', // hoặc 'gpt-4o-mini',
        temperature: 0,
        messages: [
          {
            role: 'system',
            content: [
              'You are a JSON extractor. Respond ONLY with a single valid JSON object—no explanations, no extra text, and do NOT wrap it in markdown or code fences.',
              'All fields must be numbers (no units).',
              "For fields T1 and T2, interpret the letter 'T' as 1 torque unit:",
              "- If the original value is exactly 'T', output 1.",
              "- If it's of the form '<number>T' (e.g. '0.8T'), output that <number> (decimal point)."
            ].join(' ')
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `Extract all text from this image and preserve formatting (bullet points, formulas, units).
      Then extract the following fields and return them as a single JSON object with only numeric values (strip all units and text):
      - F
      - v
      - z
      - p
      - L
      - t1
      - t2
      - T1
      - T2`.trim()
              },
              { type: 'image_url', image_url: { url: `data:image/png;base64,${imgBase64}` } }
            ]
          }
        ],
        max_tokens: 500
      })

      const text = resp.choices[0].message.content

      if (!text) {
        this.failedMessage(res, 'AI không trả về nội dung')
        return
      }

      let data: Record<string, any>
      try {
        data = JSON.parse(text)
      } catch (error) {
        // Return *once* here and exit
        this.failedMessage(res, 'Không parse được JSON từ AI', text)
        return
      }

      // console.log(data)

      this.successMessage(res, 'Lấy dữ liệu thành công từ AI', data)
    } catch (error: any) {
      this.failedMessage(res, error.message)
    }
  }

  public handleChapter1 = async (req: Request, res: Response) => {
    try {
      const inputId = req.query.inputId
      const n_ol = req.query.n_ol ? parseFloat(req.query.n_ol as string) : -1
      const n_tv = req.query.n_tv ? parseFloat(req.query.n_tv as string) : -1
      const n_brt = req.query.n_brt ? parseFloat(req.query.n_brt as string) : -1
      const n_d = req.query.n_d ? parseFloat(req.query.n_d as string) : -1
      const n_kn = req.query.n_kn ? parseFloat(req.query.n_kn as string) : -1
      const engine = req.query.engineId ? new mongoose.Types.ObjectId(req.query.engineId as string) : null

      if (typeof inputId !== 'string' || !mongoose.Types.ObjectId.isValid(inputId)) {
        this.failedMessage(res, 'Invalid inputId')
        return
      }

      const inputObjectId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(inputId)
      const result = await this.calculateService.handleChapter1(inputObjectId, n_ol, n_tv, n_brt, n_d, n_kn, engine)
      // console.log(result)
      this.successMessage(res, 'Tính toán chương 1 thành công', result)
    } catch (error: any) {
      this.failedMessage(res, error.message)
    }
  }

  public handleChapter2 = async (req: Request, res: Response) => {
    try {
      const inputId = req.query.inputId

      if (typeof inputId !== 'string' || !mongoose.Types.ObjectId.isValid(inputId)) {
        this.failedMessage(res, 'Invalid inputId')
        return
      }

      const inputObjectId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(inputId)
      let result = await this.calculateService.getChapter2(inputObjectId)
      if (!result) {
        result = await this.calculateService.handleChapter2(inputObjectId)
      }
      this.successMessage(res, 'Tính toán chương 2 thành công', result)
    } catch (error: any) {
      this.failedMessage(res, error.message)
    }
  }

  public handleChapter3 = async (req: Request, res: Response) => {
    try {
      const inputId = req.query.inputId
      const lm12 = req.query.lm12 ? parseInt(req.query.lm12 as string) : -1
      const lm22 = req.query.lm22 ? parseInt(req.query.lm22 as string) : -1
      const lm23 = req.query.lm23 ? parseInt(req.query.lm23 as string) : -1
      const lm34 = req.query.lm34 ? parseInt(req.query.lm34 as string) : -1
      const lm33 = req.query.lm33 ? parseInt(req.query.lm33 as string) : -1
      const F_nt = req.query.F_nt ? parseInt(req.query.F_nt as string) : -1

      if (typeof inputId !== 'string' || !mongoose.Types.ObjectId.isValid(inputId)) {
        this.failedMessage(res, 'Invalid inputId')
        return
      }

      const inputObjectId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(inputId)
      const result = await this.calculateService.handleChapter3(inputObjectId, lm12, lm22, lm23, lm34, lm33, F_nt)
      this.successMessage(res, 'Tính toán chương 3 thành công', result)
    } catch (error: any) {
      this.failedMessage(res, error.message)
    }
  }

  public handleChapter4 = async (req: Request, res: Response) => {
    try {
      const inputId = req.query.inputId

      if (typeof inputId !== 'string' || !mongoose.Types.ObjectId.isValid(inputId)) {
        this.failedMessage(res, 'Invalid inputId')
        return
      }

      const inputObjectId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(inputId)

      const result = await this.calculateService.handleChapter4(inputObjectId)
      this.successMessage(res, 'Tính toán chương 4 thành công', result)
    } catch (error: any) {
      this.failedMessage(res, error.message)
    }
  }

  public handleChapter5 = async (req: Request, res: Response) => {
    try {
      const inputId = req.query.inputId

      if (typeof inputId !== 'string' || !mongoose.Types.ObjectId.isValid(inputId)) {
        this.failedMessage(res, 'Invalid inputId')
        return
      }

      const inputObjectId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(inputId)

      const result = await this.calculateService.handleChapter5(inputObjectId)
      this.successMessage(res, 'Tính toán chương 5 thành công', result)
    } catch (error: any) {
      this.failedMessage(res, error.message)
    }
  }

  public handleChapter6 = async (req: Request, res: Response) => {
    try {
      const inputId = req.query.inputId

      if (typeof inputId !== 'string' || !mongoose.Types.ObjectId.isValid(inputId)) {
        this.failedMessage(res, 'Invalid inputId')
        return
      }

      const inputObjectId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(inputId)

      const result = await this.calculateService.handleChapter6(inputObjectId)
      this.successMessage(res, 'Tính toán chương 6 thành công', result)
    } catch (error: any) {
      this.failedMessage(res, error.message)
    }
  }

  public handleChapter7 = async (req: Request, res: Response) => {
    try {
      const inputId = req.query.inputId

      if (typeof inputId !== 'string' || !mongoose.Types.ObjectId.isValid(inputId)) {
        this.failedMessage(res, 'Invalid inputId')
        return
      }

      const inputObjectId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(inputId)

      const result = await this.calculateService.handleChapter7(inputObjectId)
      this.successMessage(res, 'Tính toán chương 7 thành công', result)
    } catch (error: any) {
      this.failedMessage(res, error.message)
    }
  }
}
