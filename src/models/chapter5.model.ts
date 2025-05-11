import mongoose, { Schema } from 'mongoose'

const chapter5Schema = new Schema<any>(
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

const Chapter5 = mongoose.model<any>('chapter5', chapter5Schema, 'chapter5')
export default Chapter5
