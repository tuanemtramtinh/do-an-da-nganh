import dotenv from 'dotenv'
import jwt, { JwtPayload, Secret } from 'jsonwebtoken'
import User from '~/models/user.model'

dotenv.config()

export class AuthService {
  private static instance: AuthService
  private accessToken: Secret
  private accessTokenExpireTime: any

  private constructor() {
    if (!process.env.ACCESS_TOKEN_SECRET || !process.env.ACCESS_TOKEN_EXPIRES) {
      throw Error('Missing ENV variable')
    }
    this.accessToken = process.env.ACCESS_TOKEN_SECRET as Secret
    this.accessTokenExpireTime = process.env.ACCESS_TOKEN_EXPIRES as string
  }

  public static getInstance = () => {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }

  public genAccessToken = (payload: any) => {
    return jwt.sign(payload, this.accessToken, { expiresIn: this.accessTokenExpireTime })
  }

  public verifyAccessToken = (accessToken: string) => {
    try {
      const decodedToken = jwt.verify(accessToken, this.accessToken)
      return decodedToken
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return -1
      }
      // AccessToken không hợp lệ
      return 0
    }
  }
}
