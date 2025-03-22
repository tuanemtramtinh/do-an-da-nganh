import mongoose, { Schema } from 'mongoose'

const chapter1Schema = new Schema<any>(
  {
    inputId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'input'
    },
    engineId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'engine'
    },
    n_lv: Number,
    P_td: Number,
    P_dc: Number,
    P_I: Number,
    P_II: Number,
    P_III: Number,
    n_dc: Number,
    n_I: Number,
    n_II: Number,
    n_III: Number,
    u_dc: Number,
    u_I_II: Number,
    u_II_III: Number,
    T_dc: Number,
    T_I: Number,
    T_II: Number,
    T_III: Number
  },
  {
    timestamps: true,
    strict: false
  }
)

const Chapter1 = mongoose.model<any>('chapter1', chapter1Schema, 'chapter1')

export default Chapter1
