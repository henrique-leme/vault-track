import * as dotenv from 'dotenv'

dotenv.config()

const PROCESS_ENV = process.env

export const config = {
  PORT: PROCESS_ENV.PORT ?? 8080,
  MONGO_URI: PROCESS_ENV.MONGO_URI ?? 'mongodb://localhost:27017',
}
