import { config } from '@/config'
import mongoose from 'mongoose'

export async function mongo() {
  try {
    await mongoose.connect(config.MONGO_URI, {
      dbName: config.MONGO_DB_NAME,
    })
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error)
    throw error
  }
}
