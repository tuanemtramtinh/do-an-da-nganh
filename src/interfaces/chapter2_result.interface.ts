import { Types } from 'mongoose'

export interface IBeltParameters {
  B: number
  F0: number
  Fr: number
  L: number
  a: number
  d1: number
  d2: number
  goc_om_dai: number
  z: number
}

export interface IGearSpecification {
  awx: number
  bw: number
  d1: number
  d2: number
  da1: number
  da2: number
  df1: number
  df2: number
  dw1: number
  dw2: number
}

export interface ITrucVit {
  d1: number
  da1: number
  df1: number
  y: number
  b1: number
}

export interface IBanhVit {
  d2: number
  da2: number
  df2: number
  aw: number
  daM2: number
  b2: number
}

export interface ISizeOfTransmission {
  truc_vit: ITrucVit
  banh_vit: IBanhVit
}

export interface IChapter2Result {
  inputId: Types.ObjectId
  beltParamaters: IBeltParameters
  gearSpecification: IGearSpecification
  sizeOfTranmission: ISizeOfTransmission
  aw_test: number
  createdAt?: Date
  updatedAt?: Date
}
