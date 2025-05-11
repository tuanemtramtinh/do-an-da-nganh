import mongoose, { Schema } from 'mongoose'

const chapter6Schema = new Schema<any>(
  {
    inputId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'input'
    }
  },
  {
    timestamps: true,
    strict: false
  }
)

const Chapter6 = mongoose.model<any>('chapter6', chapter6Schema, 'chapter6')
export default Chapter6
