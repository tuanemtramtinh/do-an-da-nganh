import { AbstractHandler } from '../abstract.handler'

export class Chapter5Section2Handler extends AbstractHandler {
  public handle(inputData: any, result: any, request: string = ''): any | null {
    //2.1
    const R = 12

    const kichthuocnapquansat = {
      A: 150,
      B: 100,
      A1: 190,
      B1: 140,
      C: 175,
      C1: null,
      K: 120,
      R: 12,
      Vit: 'M8x22',
      Soluong: '4'
    }

    //2.2
    const kichthuocnutthonghoi = {
      A: 'M27x2',
      B: 15,
      C: 30,
      D: 15,
      E: 45,
      G: 36,
      H: 32,
      I: 6,
      K: 4,
      L: 10,
      M: 8,
      N: 22,
      O: 6,
      P: 32,
      Q: 18,
      R: 36,
      S: 32
    }

    //2.3
    const kichthuocnutthaodau = {
      d: 'M30x2',
      b: 18,
      m: 14,
      f: 4,
      L: 36,
      c: 4,
      q: 27,
      D: 45,
      S: 32,
      D_0: 36.9
    }

    //2.6

    const delta = 8

    const D = 90 // chuong4

    const Dsau = D + 2 * delta
    console.log("D':" + Dsau)

    const d4 = 10

    const D2 = Dsau + 1.6 * d4
    console.log('D2:' + D2)

    const D3 = Dsau + 4.4 * d4
    console.log('D3:' + D3)

    const trucI = {
      truc: 'I',
      "D'": Dsau,
      D2: D2,
      D3: D3
    }

    //2.7

    const aw = 210
    const Q_ = 350

    const kichthuocbulong = {
      d: 'M20',
      d1: 72,
      d2: 40,
      d3: 16,
      d4: 40,
      d5: 28,
      h: 35,
      h1: 14,
      h2: 9,
      I: 38,
      f: 2,
      b: 19,
      c: 2.5,
      x: 5,
      r: 3,
      r1: 7,
      r2: 7,
      trongluong: {
        a: 850,
        b: 650,
        c: 300
      }
    }
    //2.8

    const kichthuocnoitrucdanhoi = {
      T: 4000,
      d: 80,
      D: 320,
      dm: 175,
      L: 270,
      I: 130,
      d1: 24,
      Do: 242,
      Z: 8,
      nmax: 2300,
      B: 8,
      B1: 70,
      I1: 48,
      D3: 40,
      I2: 48
    }

    const kichthuocvongdanhoi = {
      T: 4000,
      de: 30,
      d1: 'M24',
      D2: 38,
      I: 110,
      I1: 65,
      I2: 30,
      I3: 56,
      h: 3
    }

    return super.handle(
      inputData,
      {
        ...result,
        chapter5: {
          ...result.chapter5,
          kichthuocnapquansat,
          kichthuocnutthonghoi,
          kichthuocnutthaodau,
          trucI,
          kichthuocbulong,
          kichthuocnoitrucdanhoi,
          kichthuocvongdanhoi
        }
      },
      request
    )
  }
}
