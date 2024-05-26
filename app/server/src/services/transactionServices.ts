import { AccountModel } from 'src/models/account.model'
import { TransactionError } from 'src/utils/transactionError'
import { findAccountByTaxId } from './accountServices'
import { TransactionData } from '@/modules/transaction/mutations/createTransaction'
import transactionModel from 'src/models/transaction.model'
import mongoose from 'mongoose'

export async function transactionAccountValidations(data: TransactionData) {
  const userAccount = await accountSenderValidation(data.sender)
  await accountReceiverValidation(data.receiver)

  return userAccount
}

export async function idempotencyCheck(idempotencyId: string) {
  const existingTransaction = await transactionModel.findOne({
    idempotencyId: idempotencyId,
  })

  if (existingTransaction) {
    return true
  }
  return false
}

export async function createTransaction(
  data: TransactionData,
  idempotencyId: string,
) {
  const { accountNumber: accountSender } = await findAccountByTaxId(data.sender)
  const { accountNumber: accountReceiver } = await findAccountByTaxId(
    data.receiver,
  )
  const decimalAmount = mongoose.Types.Decimal128.fromString(
    data.amount.toString(),
  )

  await newTransaction(
    data,
    accountSender,
    accountReceiver,
    decimalAmount,
    idempotencyId,
  )
}

const newTransaction = async (
  data: TransactionData,
  accountSender: number,
  accountReceiver: number,
  decimalAmount: mongoose.Types.Decimal128,
  idempotencyId: string,
) => {
  const teste = await transactionModel.create({
    sender: accountSender,
    receiver: accountReceiver,
    amount: decimalAmount,
    type: data.type,
    description: data.description ?? '',
    idempotencyId: idempotencyId,
  })

  return teste
}

const accountSenderValidation = async (taxId: string) => {
  const account = await findAccountByTaxId(taxId)

  return account
}

const accountReceiverValidation = async (taxId: string) => {
  await findAccountByTaxId(taxId)

  return true
}

// Transformar em function
export const verifyBalance = async (
  amount: number,
  userAccount: AccountModel,
) => {
  const { balance } = userAccount

  const parsedAmount = parseFloat(amount.toString())
  const parsedBalance = parseFloat(balance.toString())

  if (parsedBalance >= parsedAmount) {
    return true
  }

  throw new TransactionError({
    name: 'NotEnoughBalance',
    message: 'Insufficient balance to make this transaction.',
  })
}

// This is only used for making possible the test of sending
// currency to other accounts, since an account is created
// by default with a balance of 0.
// And in a real application, it would be possible to receive
// money from other banks and stuff
export async function createDepositTransaction(
  data: TransactionData,
  idempotencyId: string,
) {
  const accountSender = 10000000000
  const { accountNumber: accountReceiver } = await findAccountByTaxId(
    data.receiver,
  )
  const decimalAmount = mongoose.Types.Decimal128.fromString(
    data.amount.toString(),
  )

  await newTransaction(
    data,
    accountSender,
    accountReceiver,
    decimalAmount,
    idempotencyId,
  )
}
