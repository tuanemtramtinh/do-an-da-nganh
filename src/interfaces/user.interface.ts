import mongoose from 'mongoose'

export interface IUser {
  username: string
  password: string
  fullname: string
  accessToken?: string
  refreshToken?: string
  _id?: mongoose.Schema.Types.ObjectId
}
