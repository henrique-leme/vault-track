import mongoose from 'mongoose'
import ShortUniqueId from 'short-unique-id'
import accountModel from '../../src/models/account.model'
import transactionModel from '../../src/models/transaction.model'
import userModel from '../../src/models/user.model'
import { AccountError } from '../../src/utils/accountError'
import { UserError } from '../../src/utils/userError'

export async function createAccount(userId: string) {
  await newAccount(userId)
}

const newAccount = async (userId: string) => {
  const accountNumer = await generateAccountNumber()

  await accountModel.create({
    accountNumber: accountNumer,
    userId: userId,
  })
}

const generateAccountNumber = async (): Promise<number> => {
  const accountNumber = new ShortUniqueId({
    dictionary: 'number',
    length: 20,
  }).randomUUID()

  return parseInt(accountNumber)
}

export const calculateBalance = async (accountNumber: number) => {
  const currentBalance = await transactionModel.aggregate([
    {
      $match: {
        $or: [{ sender: accountNumber }, { receiver: accountNumber }],
      },
    },
    {
      $group: {
        _id: null,
        balance: {
          $sum: {
            $cond: [
              { $eq: ['$sender', accountNumber] },
              {
                $multiply: [
                  '$amount',
                  mongoose.Types.Decimal128.fromString('-1'),
                ],
              },
              '$amount',
            ],
          },
        },
      },
    },
  ])

  if (currentBalance.length === 0) {
    return [{ balance: mongoose.Types.Decimal128.fromString('0') }]
  }

  return currentBalance.map((balance: any) => ({
    ...balance,
    balance: mongoose.Types.Decimal128.fromString(balance.balance.toString()),
  }))
}

export const updateBalance = async (accountNumber: number) => {
  await findAccountByAccountNumber(accountNumber)

  const currentBalance = await calculateBalance(accountNumber)

  const balanceToUpdate =
    currentBalance[0]?.balance || mongoose.Types.Decimal128.fromString('0')

  const account = await accountModel.findOneAndUpdate(
    {
      accountNumber: accountNumber,
    },
    {
      balance: balanceToUpdate,
    },
    { new: true },
  )

  return account?.balance
}

const findAccountByAccountNumber = async (accountNumber: number) => {
  try {
    const account = await accountModel.findOne({ accountNumber: accountNumber })

    return account
  } catch (error) {
    throw new AccountError({
      name: 'AccountNotFound',
      message: 'There is no account with this accountNumber.',
    })
  }
}

export async function findAccountByUserId(userId: any) {
  const account = await accountModel.findOne({
    userId: userId,
  })

  if (account) {
    return account
  }

  throw new AccountError({
    name: 'AccountNotFound',
    message: 'There is no account for this user, contact the support.',
  })
}

export async function findAccountByTaxId(taxId: string) {
  const user = await userModel.findOne({
    taxId: taxId,
  })

  if (user) {
    const account = await findAccountByUserId(user._id)
    return account
  }

  throw new UserError({
    name: 'UserNotFound',
    message: 'There is no user with this taxId.',
  })
}

export async function findAccountAndUpdatedBalance(taxId: string) {
  const user = await userModel.findOne({
    taxId: taxId,
  })

  if (user) {
    const { _id, accountNumber, userId } = await findAccountByUserId(user._id)
    const balance = await updateBalance(accountNumber)

    const account = {
      uniqueId: _id,
      accountNumber: accountNumber,
      userId: userId.toString(),
      balance: parseFloat(balance!.toString()),
    }

    return account
  }

  throw new UserError({
    name: 'UserNotFound',
    message: 'There is no user with this taxId.',
  })
}

export async function deleteAccount(accountNumber: number) {
  const balance = await calculateBalance(accountNumber)

  const accountBalance =
    balance.length > 0
      ? balance[0].balance
      : mongoose.Types.Decimal128.fromString('0.0')

  if (accountBalance.toString() !== '0') {
    throw new AccountError({
      name: 'DeleteAccountError',
      message: "You can't delete an account with balance.",
    })
  }

  await accountModel.deleteOne({ accountNumber: accountNumber })

  return true
}
