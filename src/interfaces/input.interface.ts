import mongoose from "mongoose"

export interface IInputData {
  F: number //Lực vòng trên xích tải
  v: number //Vận tốc xích tải
  z: number //Số răng đĩa xích tải dẫn
  p: number //Bước xích tải
  L: number //Thời gian phục vụ
  t1: number //Chế độ tải
  t2: number //Chế độ tải
  T1: number //Chế độ tải
  T2: number //Chế độ tải
  _id?: mongoose.Schema.Types.ObjectId
}
