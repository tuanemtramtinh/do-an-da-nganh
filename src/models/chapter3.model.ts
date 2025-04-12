import mongoose, { Schema } from 'mongoose'

const chapter3Schema = new Schema<any>(
  {
    inputId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'input'
    },
    status: {
      type: String
    }
  },
  {
    timestamps: true,
    strict: false
  }
)

const Chapter3 = mongoose.model<any>('chapter3', chapter3Schema, 'chapter3')
export default Chapter3
