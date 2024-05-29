import {
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql'
import { TransactionModel } from 'src/models/transaction.model'

export const ETransactionEnumType = new GraphQLEnumType({
  name: 'TransactionType',
  values: {
    DEPOSIT: { value: 'DEPOSIT' },
    TRANSFER: { value: 'TRANSFER' },
  },
})

export const tranasctionType = new GraphQLObjectType<TransactionModel>({
  name: 'Transaction',
  description: 'An transaction object',
  fields: () => ({
    sender: {
      type: GraphQLString,
      description: 'The account that is sending the transaction',
    },
    receiver: {
      type: GraphQLString,
      description: 'The account that is receiving the transaction',
    },
    amount: {
      type: GraphQLFloat,
      description: 'The amount of the transaction',
    },
    type: {
      type: ETransactionEnumType,
      description: 'The type of the transaction',
    },
    description: {
      type: GraphQLString,
      description: 'The description of the transaction',
    },
  }),
})
