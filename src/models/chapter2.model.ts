import mongoose, { Schema } from 'mongoose'

const chapter2Schema = new Schema<any>(
  {
    inputId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'input'
    },
    beltParamaters: {
      B: Number,
      F0: Number,
      Fr: Number,
      L: Number,
      a: Number,
      d1: Number,
      d2: Number,
      goc_om_dai: Number,
      z: Number
    },
    gearSpecification: {
      awx: Number,
      bw: Number,
      d1: Number,
      d2: Number,
      da1: Number,
      da2: Number,
      df1: Number,
      df2: Number,
      dw1: Number,
      dw2: Number
    },
    sizeOfTranmission: {
      truc_vit: {
        d1: Number,
        da1: Number,
        df1: Number,
        y: Number,
        b1: Number
      },
      banh_vit: {
        d2: Number,
        da2: Number,
        df2: Number,
        aw: Number,
        daM2: Number,
        b2: Number
      },
      Fr1: Number,
      Ft1: Number,
      Ft2: Number
    },
    aw_test: Number
  },
  {
    timestamps: true
  }
)

const Chapter2 = mongoose.model<any>('chapter2', chapter2Schema, 'chapter2')

export default Chapter2
