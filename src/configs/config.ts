import mongoose from 'mongoose'

export class Database {
  private static instance: Database
  private connectionString: string

  private constructor() {
    this.connectionString = process.env.MONGO_URL as string
  }

  public static getInstance() {
    if (!Database.instance) {
      this.instance = new Database()
    }
    return this.instance
  }

  public async connect() {
    await mongoose.connect(this.connectionString, {
      authSource: 'admin',
      user: process.env.MONGO_USER,
      pass: process.env.MONGO_PASS
    })
    console.log('Connect to database successfully')
  }
}
