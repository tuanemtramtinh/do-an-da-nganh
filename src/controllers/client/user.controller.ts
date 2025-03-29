import { UserService } from '~/services/user.service'
import { Controller } from '../index.controller'
import { Request, Response } from 'express'
import { IUser } from '~/interfaces/user.interface'
import mongoose from 'mongoose'

export class UserController extends Controller {
  private userService: UserService

  constructor(userService: UserService) {
    super()
    this.userService = userService
  }

  public login = async (req: Request, res: Response) => {
    try {
      const data: IUser = req.body
      const existUser: IUser = await this.userService.login(data)
      this.successMessage(res, 'Đăng nhập thành công', existUser)
    } catch (error: any) {
      this.failedMessage(res, error.message)
    }
  }

  public register = async (req: Request, res: Response) => {
    try {
      const data: IUser = req.body
      const newUser: IUser | number = await this.userService.register(data)
      this.successMessage(res, 'Tạo người dùng mới thành công', newUser)
    } catch (error: any) {
      this.failedMessage(res, error.message)
    }
  }

  public getUserInfo = async (req: Request, res: Response) => {
    try {
      const userId: mongoose.Schema.Types.ObjectId = req.user?._id
      const user: IUser = await this.userService.getUserInfo(userId)
      this.successMessage(res, 'Lấy thông tin người dùng thành công', {
        username: user.username
      })
    } catch (error: any) {
      this.failedMessage(res, error.message)
    }
  }

  public getUserHistory = async (req: Request, res: Response) => {
    try {
      const userId = (mongoose.Schema.Types.ObjectId = req.user?._id)
      const historyList = await this.userService.history(userId)
      this.successMessage(res, 'Lấy danh sách lịch sử thành công', historyList)
    } catch (error: any) {
      this.failedMessage(res, error.message)
    }
  }
}
