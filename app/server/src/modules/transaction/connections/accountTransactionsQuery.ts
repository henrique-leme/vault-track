import {
  connectionDefinitions,
  connectionArgs,
  connectionFromArray,
} from 'graphql-relay'
import { tranasctionType } from '../transactionType'
import { listTransactionsByAccountNumber } from 'src/services/transactionServices'
import { GraphQLString } from 'graphql'

const { connectionType: TransactionConnection } = connectionDefinitions({
  nodeType: tranasctionType,
})

const connection = {
  type: TransactionConnection,
  args: {
    ...connectionArgs,
    accountNumber: { type: GraphQLString },
  },
  resolve: async (
    _: any,
    { accountNumber, ...args }: { accountNumber: number },
  ) => {
    const transactions = await listTransactionsByAccountNumber(accountNumber)

    return connectionFromArray(transactions, args)
  },
}

export const AccountTransactionsQuery = {
  ...connection,
}
