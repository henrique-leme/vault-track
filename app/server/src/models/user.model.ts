import { Document, model, Schema } from 'mongoose'

export interface IUser extends Document {
  firstName: string
  secondName?: string
  taxId: string
  email: string
  password: string
  createdAt: Date
}

export interface UserModel extends IUser, Document {
  id: string
}

const UserSchema = new Schema({
  id: Schema.Types.ObjectId,
  firstName: {
    type: String,
    required: true,
  },
  secondName: {
    type: String,
  },
  taxId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
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
