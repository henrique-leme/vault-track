import { Document, model, Schema } from 'mongoose'

export interface User extends Document {
  firstName: string
  taxId: string
  password: string
  createdAt: Date
}

export interface UserModel extends User, Document {
  id: string
}

const UserSchema = new Schema({
  id: Schema.Types.ObjectId,
  firstName: {
    type: String,
    required: true,
  },
  taxId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
})

UserSchema.set('toJSON', {
  transform: function (_doc, ret) {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
    delete ret.password
  },
})

export default model<UserModel>('User', UserSchema)
