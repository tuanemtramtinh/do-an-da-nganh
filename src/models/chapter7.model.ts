import mongoose, { Schema } from 'mongoose'

const chapter7Schema = new Schema<any>(
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

const Chapter7 = mongoose.model<any>('chapter7', chapter7Schema, 'chapter7')
export default Chapter7
