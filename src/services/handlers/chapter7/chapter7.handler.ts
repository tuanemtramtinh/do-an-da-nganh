import { IInputData } from '~/interfaces/input.interface'

type ShaftFit = {
  shaftNumber: number
  fitType: string
  shaftFits: {
    shaft: number
    diameter: string
    tolerance: string[]
  }[]
}

export class Chapter7Handler {
  private inputData: IInputData

  constructor(inputData: IInputData) {
    this.inputData = inputData
  }

  public run() {
    const fitDataTran: ShaftFit[] = [
      {
        shaftNumber: 1,
        fitType: 'Bánh răng - trục',
        shaftFits: [
          {
            shaft: 2,
            diameter: 'Φ70 H7/k6',
            tolerance: ['+0.03', '+0.002']
          },
          {
            shaft: 3,
            diameter: 'Φ100 H7/k6',
            tolerance: ['+0.035', '+0.025']
          }
        ]
      },
      {
        shaftNumber: 2,
        fitType: 'Bánh vít – trục',
        shaftFits: [
          {
            shaft: 2,
            diameter: 'Φ70 H7/k6',
            tolerance: ['+0.03', '+0.002']
          }
        ]
      },
      {
        shaftNumber: 3,
        fitType: 'Ổ lăn – trục',
        shaftFits: [
          {
            shaft: 1,
            diameter: 'Φ40k6',
            tolerance: ['+0.018', '+0.002']
          },
          {
            shaft: 2,
            diameter: 'Φ70k6',
            tolerance: ['+0.021']
          },
          {
            shaft: 3,
            diameter: 'Φ95k6',
            tolerance: ['+0.025']
          }
        ]
      },
      {
        shaftNumber: 4,
        fitType: 'Vỏ hộp - ổ lăn',
        shaftFits: [
          {
            shaft: 1,
            diameter: 'Φ80H7',
            tolerance: ['+0.03']
          },
          {
            shaft: 2,
            diameter: 'Φ110H7',
            tolerance: ['+0.035']
          },
          {
            shaft: 3,
            diameter: 'Φ170H7',
            tolerance: ['+0.04']
          }
        ]
      },
      {
        shaftNumber: 5,
        fitType: 'Ổ lăn – Ống lót',
        shaftFits: [
          {
            shaft: 1,
            diameter: 'Φ90H7',
            tolerance: ['+0.035']
          }
        ]
      },
      {
        shaftNumber: 6,
        fitType: 'Ống lót – Vỏ hộp',
        shaftFits: [
          {
            shaft: 1,
            diameter: '',
            tolerance: ['+0.030']
          }
        ]
      }
    ]

    const fitDataNghia_Huy: ShaftFit[] = [
      {
        shaftNumber: 1,
        fitType: 'Bánh răng - trục',
        shaftFits: [
          {
            shaft: 2,
            diameter: 'Φ70 H7/k6',
            tolerance: ['+0.03', '+0.002']
          },
          {
            shaft: 3,
            diameter: 'Φ100 H7/k6',
            tolerance: ['+0.035', '+0.025']
          }
        ]
      },
      {
        shaftNumber: 2,
        fitType: 'Bánh vít – trục',
        shaftFits: [
          {
            shaft: 2,
            diameter: 'Φ70 H7/k6',
            tolerance: ['+0.03', '+0.002']
          }
        ]
      },
      {
        shaftNumber: 3,
        fitType: 'Ổ lăn – trục',
        shaftFits: [
          {
            shaft: 1,
            diameter: 'Φ40k6',
            tolerance: ['+0.018', '+0.002']
          },
          {
            shaft: 2,
            diameter: 'Φ60k6',
            tolerance: ['+0.021']
          },
          {
            shaft: 3,
            diameter: 'Φ95k6',
            tolerance: ['+0.025']
          }
        ]
      },
      {
        shaftNumber: 4,
        fitType: 'Vỏ hộp - ổ lăn',
        shaftFits: [
          {
            shaft: 1,
            diameter: 'Φ80H7',
            tolerance: ['+0.03']
          },
          {
            shaft: 2,
            diameter: 'Φ110H7',
            tolerance: ['+0.035']
          },
          {
            shaft: 3,
            diameter: 'Φ170H7',
            tolerance: ['+0.04']
          }
        ]
      },
      {
        shaftNumber: 5,
        fitType: 'Ổ lăn – Ống lót',
        shaftFits: [
          {
            shaft: 1,
            diameter: 'Φ90H7',
            tolerance: ['+0.03']
          },
          {
            shaft: 2,
            diameter: 'Φ115H7',
            tolerance: ['+0.035']
          },
          {
            shaft: 3,
            diameter: 'Φ170H7',
            tolerance: ['']
          }
        ]
      },
      {
        shaftNumber: 6,
        fitType: 'Ống lót – Vỏ hộp',
        shaftFits: [
          {
            shaft: 1,
            diameter: '',
            tolerance: ['+0.035']
          }
        ]
      }
    ]

    let fitData

    if (this.inputData.F === 17000) {
      fitData = fitDataNghia_Huy
    } else {
      fitData = fitDataTran
    }

    return fitData
  }
}
