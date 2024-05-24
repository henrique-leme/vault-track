import ShortUniqueId from 'short-unique-id'
import accountModel from 'src/models/account.model'
import transactionModel from 'src/models/transaction.model'

export async function createAccount(userId: string) {
  await newAccount(userId)
}

const newAccount = async (userId: string) => {
  const accountNumer = await generateAccountNumber()

  new accountModel({
    accountNumber: accountNumer,
    userId: userId,
    balance: 0.0,
  })
}

const generateAccountNumber = async (): Promise<number> => {
  const accountNumber = new ShortUniqueId({
    dictionary: 'number',
    length: 20,
  }).randomUUID()

  return parseInt(accountNumber)
}

const calculateBalance = async (userId: string) => {
  try {
    const transactions = await transactionModel.aggregate([
      {
        $match: {
          $or: [{ sender: userId }, { receiver: userId }],
        },
      },
      {
        $group: {
          _id: null,
          balance: {
            $sum: {
              $cond: [
                { $eq: ['$sender', userId] },
                { $multiply: ['$amount', -1] },
                '$amount',
              ],
            },
          },
        },
      },
    ])

    return transactions
  } catch (error) {
    console.error('Error calculating balance:', error)
  }
}

export const updateBalance = async (
  accountNumber: string,
  currentBalance: string,
) => {
  await findAccount(accountNumber)

  await accountModel.findOneAndUpdate(
    {
      accountNumber: accountNumber,
    },
    {
      balance: currentBalance,
    },
  )

  return true
}

const findAccount = async (accountNumber: string) => {
  try {
    const account = await accountModel.findOne({ accountNumber: accountNumber })

    return account
  } catch (error) {
    console.log('Error finding account:', error)
  }
}

export default calculateBalance