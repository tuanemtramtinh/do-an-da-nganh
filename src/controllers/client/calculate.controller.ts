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

  public testAI = async (req: Request, res: Response) => {
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
        model: 'gpt-4o-mini', // hoặc 'gpt-4o-mini'
        messages: [
          {
            role: 'system',
            content: 'You are an AI assistant capable of reading text from images and extracting parameters.'
          },
          {
            role: 'user',
            content: `Giải pháp cho prompt trích xuất dữ liệu từ hình ảnh

Tôi hiểu mối quan ngại của bạn về việc hình ảnh đầu vào có thể thay đổi và nguy cơ API sẽ sao chép kết quả từ ví dụ cụ thể thay vì thực sự trích xuất dữ liệu. Đây là một vấn đề thực tế khi làm việc với các mô hình AI.

Dưới đây là prompt được tối ưu hóa để giải quyết vấn đề này:

Phân tích hình ảnh chứa thông số kỹ thuật và trích xuất các giá trị số. Tìm và trích xuất những thông tin sau:

1. F: Lực vòng trên xích tải (đơn vị N)
2. v: Vận tốc xích tải (đơn vị m/s)
3. p: Bước xích tải (đơn vị mm)
4. L: Thời gian phục vụ (đơn vị năm)
5. z: Số răng đĩa xích tải dẫn
6. T1: Hệ số tải T₁ (nếu thấy "T₁ = T" thì giá trị là 1.0)
7. t1: Thời gian t₁ (đơn vị giây)
8. T2: Hệ số tải T₂ (nếu thấy "T₂ = 0.8T" thì giá trị là 0.8)
9. t2: Thời gian t₂ (đơn vị giây)

Trả về KẾT QUẢ DUY NHẤT là một đối tượng JSON hợp lệ với các quy tắc sau:
- Loại bỏ tất cả đơn vị từ các giá trị
- Sử dụng kiểu số (không phải chuỗi) cho tất cả giá trị
- Không bao gồm bất kỳ giải thích, khối mã hoặc văn bản bổ sung nào
- Đối tượng JSON phải bắt đầu bằng { và kết thúc bằng }

QUAN TRỌNG: KHÔNG sử dụng bất kỳ giá trị cụ thể nào trong ví dụ hoặc mẫu. Chỉ trích xuất thông tin từ hình ảnh được cung cấp.
Chuỗi đã định dạng để sử dụng trong mã của bạn:

Copyprompt = """Phân tích hình ảnh chứa thông số kỹ thuật và trích xuất các giá trị số. Tìm và trích xuất những thông tin sau:

1. F: Lực vòng trên xích tải (đơn vị N)
2. v: Vận tốc xích tải (đơn vị m/s)
3. p: Bước xích tải (đơn vị mm)
4. L: Thời gian phục vụ (đơn vị năm)
5. z: Số răng đĩa xích tải dẫn
6. T1: Hệ số tải T₁ (nếu thấy "T₁ = T" thì giá trị là 1.0)
7. t1: Thời gian t₁ (đơn vị giây)
8. T2: Hệ số tải T₂ (nếu thấy "T₂ = 0.8T" thì giá trị là 0.8)
9. t2: Thời gian t₂ (đơn vị giây)

Trả về KẾT QUẢ DUY NHẤT là một đối tượng JSON hợp lệ với các quy tắc sau:
- Loại bỏ tất cả đơn vị từ các giá trị
- Sử dụng kiểu số (không phải chuỗi) cho tất cả giá trị
- Không bao gồm bất kỳ giải thích, khối mã hoặc văn bản bổ sung nào
- Đối tượng JSON phải bắt đầu bằng { và kết thúc bằng }

QUAN TRỌNG: KHÔNG sử dụng bất kỳ giá trị cụ thể nào trong ví dụ hoặc mẫu. Chỉ trích xuất thông tin từ hình ảnh được cung cấp.`
          },
          {
            role: 'user',
            content: `![image](data:image/png;base64,${imgBase64})`
          }
        ]
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

      console.log(data)

      res.json('hello')
    } catch (error: any) {
      this.failedMessage(res, error.message)
    }
  }

  public chooseEngine = async (req: Request, res: Response) => {
    const inputId = req.body.inputId
    const result = await this.calculateService.chooseEngine(inputId)
    this.successMessage(res, 'Lưu input và trả ra danh sách động cơ thành công', result)
  }

  public engineCharacteristic = async (req: Request, res: Response) => {
    try {
      const inputId = req.body.inputId
      const engineId = req.body.engineId
      const result = await this.calculateService.engineCharacteristics(inputId, engineId)
      this.successMessage(res, 'Tính toán thành công', result)
    } catch (error: any) {
      this.failedMessage(res, error.message)
    }
  }

  public getChapter1 = async (req: Request, res: Response) => {
    try {
      const inputId = req.query.inputId

      if (typeof inputId !== 'string' || !mongoose.Types.ObjectId.isValid(inputId)) {
        this.failedMessage(res, 'Invalid inputId')
        return
      }

      const inputObjectId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(inputId)

      const result = await this.calculateService.getChapter1(inputObjectId)
      this.successMessage(res, 'Lấy chương 1 thành công', result)
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

      if (typeof inputId !== 'string' || !mongoose.Types.ObjectId.isValid(inputId)) {
        this.failedMessage(res, 'Invalid inputId')
        return
      }

      const inputObjectId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(inputId)
      const result = await this.calculateService.handleChapter3(inputObjectId, lm12, lm22, lm23, lm34, lm33)
      res.json(result)
    } catch (error: any) {
      this.failedMessage(res, error.message)
    }
  }
}
