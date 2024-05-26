import {
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLInt,
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
  description: 'A transaction object',
  fields: () => ({
    sender: {
      type: GraphQLInt,
      description: 'The account that is sending the transaction',
    },
    receiver: {
      type: GraphQLInt,
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
