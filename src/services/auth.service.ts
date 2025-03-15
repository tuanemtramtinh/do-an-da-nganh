import dotenv from 'dotenv'
import jwt, { JwtPayload, Secret } from 'jsonwebtoken'

dotenv.config()

export class AuthService {
  private static instance: AuthService
  private accessToken: Secret
  private refreshToken: Secret
  private accessTokenExpireTime: any
  private refreshTokenExpireTime: any

  private constructor() {
    if (
      !process.env.ACCESS_TOKEN_SECRET ||
      !process.env.REFRESH_TOKEN_SECRET ||
      !process.env.ACCESS_TOKEN_EXPIRES ||
      !process.env.REFRESH_TOKEN_EXPIRES
    ) {
      throw Error('Missing ENV variable')
    }

    this.accessToken = process.env.ACCESS_TOKEN_SECRET as Secret
    this.refreshToken = process.env.REFRESH_TOKEN_SECRET as Secret
    this.accessTokenExpireTime = process.env.ACCESS_TOKEN_EXPIRES as string
    this.refreshTokenExpireTime = process.env.REFRESH_TOKEN_EXPIRES as string
  }

  public static getInstance() {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }

  public genAccessToken(user: any) {
    return jwt.sign({ payload: user.id }, this.accessToken, { expiresIn: this.accessTokenExpireTime })
  }

  public genRefreshToken(user: any, expireTime = this.refreshTokenExpireTime) {
    return jwt.sign({ payload: user.id }, this.refreshToken, { expiresIn: expireTime })
  }

  public verifyAccessToken(accessToken: string, refreshToken: string) {
    try {
      const decodedToken = jwt.verify(accessToken, this.accessToken)
      return decodedToken
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        //Token hết hạn, kiểm tra refreshToken
        const newRefreshToken = this.verifyRefreshToken(refreshToken)
        if (newRefreshToken === -1) {
          //Gửi thông báo từ chối yêu cầu của client
        } else {
          //Trả về accessToken và refreshToken
          const currentAccessToken = jwt.decode(accessToken) as JwtPayload
          const newAccessToken = this.genAccessToken(currentAccessToken.payload)
          return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
          }
        }
      }
    }
  }

  public verifyRefreshToken(token: string) {
    try {
      const decodedToken: JwtPayload = jwt.verify(token, this.refreshToken) as JwtPayload
      const expireTime: number = decodedToken.exp as number
      const currentTime = Math.floor(Date.now() / 1000)
      const remainTime = expireTime - currentTime
      const newRefreshToken = this.genRefreshToken(decodedToken.payload, remainTime)
      return newRefreshToken
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        //Xoá trong Database
        return -1
      }
    }
  }
}
