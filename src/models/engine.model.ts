import mongoose, { Schema } from 'mongoose'

const engineSchema = new Schema(
  {
    kieu_dong_co: String,
    cong_suat_kW: Number,
    van_toc_quay_vgph_50Hz: Number,
    van_toc_quay_vgph_60Hz: Number,
    hieu_suat_thiet_bi: Number,
    he_so_cong_suat: Number,
    ty_so_dong: Number,
    ty_so_momen: Number,
    khoi_luong: Number
  },
  {
    timestamps: true,
    strict: false
  }
)

const Engine = mongoose.model('engine', engineSchema)
export default Engine
