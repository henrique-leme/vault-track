import mongoose, { Decimal128, Document, model, Schema } from 'mongoose'

export interface IAccount extends Document {
  userId: Schema.Types.ObjectId
  accountNumber: number
  balance: Decimal128
  createdAt: Date
  updatedAt?: Date
}

export interface AccountModel extends IAccount, Document {
  id: string
}

const AccountSchema = new Schema(
  {
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
      default: new mongoose.Types.Decimal128('0.0'),
    },
  },
  {
    collection: 'Accounts',
    timestamps: true,
  },
)

AccountSchema.set('toJSON', {
  transform: function (_doc, ret) {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  },
})

export default model<AccountModel>('Account', AccountSchema)
