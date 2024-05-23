import { Decimal128, Document, model, Schema } from 'mongoose'

export interface Account extends Document {
  userId: Schema.Types.ObjectId
  accountNumber: number
  balance: Decimal128
  createdAt: Date
  updatedAt?: Date
}

export interface AccountModel extends Account, Document {
  id: string
}

const AccountSchema = new Schema({
  id: Schema.Types.ObjectId,
  accountNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  balance: {
    type: Schema.Types.Decimal128,
    default: 0.0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
})

AccountSchema.set('toJSON', {
  transform: function (_doc, ret) {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  },
})

export default model<AccountModel>('Account', AccountSchema)
