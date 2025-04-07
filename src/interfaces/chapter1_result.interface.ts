import { Schema } from 'mongoose'

export interface IChapter1Result {
  _id: Schema.Types.ObjectId
  inputId: Schema.Types.ObjectId
  engineId: Schema.Types.ObjectId
  status: string
  P_td: number
  n_lv: number
  P_I: number
  P_II: number
  P_III: number
  P_dc: number
  T_dc: number
  T_I: number
  T_II: number
  T_III: number
  u_dc: number
  u_I_II: number
  u_II_III: number
  n_dc: number
  n_I: number
  n_II: number
  n_III: number
}
