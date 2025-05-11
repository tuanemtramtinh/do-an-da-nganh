import mongoose, { Schema } from 'mongoose'

const chapter4Schema = new Schema<any>(
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

const Chapter4 = mongoose.model<any>('chapter4', chapter4Schema, 'chapter4')
export default Chapter4
