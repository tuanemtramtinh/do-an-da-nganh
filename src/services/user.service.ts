import md5 from 'md5'
import mongoose, { Model } from 'mongoose'
import { IUser } from '~/interfaces/user.interface'
import { AuthService } from './auth.service'
import { IInputData } from '~/interfaces/input.interface'
import moment from 'moment'
export class UserService {
  private User: Model<IUser>
  private Input: Model<IInputData>
  private authService: AuthService

  constructor(User: Model<IUser>, Input: Model<IInputData>, authService: AuthService) {
    this.User = User
    this.Input = Input
    this.authService = authService
  }

  public login = async (data: IUser): Promise<IUser> => {
    const existUser: IUser | null = await this.User.findOne({
      username: data.username
    }).lean()

    if (!existUser) throw Error('Tên người dùng bị sai hoặc không tồn tại')

    const hasedPassword = md5(data.password)
    if (existUser.password !== hasedPassword) throw Error('Mật khẩu sai')

    existUser.accessToken = this.authService.genAccessToken({ id: existUser._id })
    return existUser
  }

  public register = async (data: IUser): Promise<IUser> => {
    const existUser: IUser | null = await this.User.findOne({
      username: data.username,
      fullname: data.fullname
    })

    if (existUser) {
      throw Error('Người dùng đã tồn tại')
    }

    const hashedPassword = md5(data.password)
    data.password = hashedPassword
    const newUser: IUser = await this.User.create(data)
    return newUser
  }

  public getUserInfo = async (userId: mongoose.Schema.Types.ObjectId) => {
    const user = await this.User.findById(userId)
    if (user) return user
    throw Error('Người dùng không tồn tại')
  }

  public history = async (userId: mongoose.Schema.Types.ObjectId) => {
    const inputs = await this.Input.find({
      userId: userId
    })
      .select('_id createdAt')
      .sort({ createdAt: -1 })
    const inputsData = inputs.map((item) => {
      return {
        id: item.id,
        createdAt: moment(item.createdAt).format('DD-MM-YYYY HH:mm')
      }
    })
    return inputsData
  }
}
