import { Decimal128, Document, Schema, model } from 'mongoose'

export interface Transaction extends Document {
  sender: Schema.Types.ObjectId
  receiver: Schema.Types.ObjectId
  amount: Decimal128
  type: string
  createdAt: Date
}

export interface TransactionModel extends Transaction, Document {
  id: string
}

enum ETransactionType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
}

const TransactionSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: 'User',
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

TransactionSchema.set('toJSON', {
  transform: function (_doc, ret) {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  },
})

export default model<TransactionModel>('Transaction', TransactionSchema)
