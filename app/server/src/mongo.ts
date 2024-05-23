import { config } from '@/config'
import mongoose from 'mongoose'

export async function mongo() {
  try {
    await mongoose.connect(config.MONGO_URI)

    console.log('MongoDB connection established')
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error)
    throw error
  }
}
