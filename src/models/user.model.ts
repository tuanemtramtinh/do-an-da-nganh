import mongoose, { Schema } from 'mongoose'
import { IUser } from '~/interfaces/user.interface'

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true },
    fullname: { type: String, required: true },
    password: { type: String, required: true },
    refreshToken: { type: String }
  },
  {
    timestamps: true
  }
)

const User = mongoose.model<IUser>('user', userSchema)
export default User
