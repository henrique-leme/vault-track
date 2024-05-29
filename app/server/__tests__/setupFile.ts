import { config } from '@/config'
import mongoose from 'mongoose'
config

beforeAll(async () => {
  await mongoose.connect(config.MONGO_URI)
})

afterAll(async () => {
  await mongoose.disconnect()
})
