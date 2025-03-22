import mongoose, { Schema } from 'mongoose'
import { IInputData } from '~/interfaces/input.interface'

const inputSchema = new Schema<IInputData>(
  {
    F: { type: Number, required: true },
    v: { type: Number, required: true },
    z: { type: Number, required: true },
    p: { type: Number, required: true },
    L: { type: Number, required: true },
    t1: { type: Number, required: true },
    t2: { type: Number, required: true },
    T1: { type: Number, required: true },
    T2: { type: Number, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'user' }
  },
  {
    timestamps: true
  }
)

const Input = mongoose.model<IInputData>('input', inputSchema)
export default Input
