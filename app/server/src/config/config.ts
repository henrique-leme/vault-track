import * as dotenv from 'dotenv'

dotenv.config()

const PROCESS_ENV = process.env

export const config = {
  MONGO_DB_NAME: PROCESS_ENV.MONGO_DB_NAME ?? 'vault-track',
  PORT: PROCESS_ENV.PORT ?? 8080,
  JWT_KEY: PROCESS_ENV.JWT_KEY ?? 'exemple',
  MONGO_URI: PROCESS_ENV.MONGO_URI ?? 'mongodb://localhost:37017',
}
