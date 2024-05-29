import { MongoMemoryServer } from 'mongodb-memory-server'
import * as mongoose from 'mongoose'
import config from './config'

export = async function globalSetup() {
  if (config.Memory) {
    const instance = await MongoMemoryServer.create()
    const uri = instance.getUri()
    ;(global as any).__MONGOINSTANCE = instance
    process.env.MONGO_URI = uri.slice(0, uri.lastIndexOf('/'))
  } else {
    process.env.MONGO_URI = `mongodb://${config.IP}:${config.Port}`
  }

  const conn = await mongoose.connect(
    `${process.env.MONGO_URI}/${config.Database}`,
  )
  await conn.connection.db.dropDatabase()
  await mongoose.disconnect()
}
