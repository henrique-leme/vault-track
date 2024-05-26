import { Decimal128, Document, Schema, model } from 'mongoose'

export interface Transaction extends Document {
  sender: number
  receiver: number
  amount: Decimal128
  type: string
  description?: string
  createdAt: Date
}

export interface TransactionModel extends Transaction, Document {
  id: string
}

enum ETransactionType {
  TRANSFER = 'TRANSFER',
  DEPOSIT = 'DEPOSIT',
}

const TransactionSchema = new Schema(
  {
    idempotencyId: {
      type: String,
      unique: true,
      required: true,
    },
    sender: {
      type: Number,
      ref: 'Account',
      required: true,
    },
    receiver: {
      type: Number,
      ref: 'Account',
      required: true,
    },
    amount: {
      type: Schema.Types.Decimal128,
      required: true,
    },
    type: {
      type: String,
      enum: ETransactionType,
      required: true,
    },
    description: {
      type: String,
    },
  },
  {
    collection: 'Transactions',
    timestamps: true,
  },
)

TransactionSchema.set('toJSON', {
  transform: function (_doc, ret) {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  },
})

export default model<TransactionModel>('Transaction', TransactionSchema)
