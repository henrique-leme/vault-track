import { GraphQLObjectType, GraphQLString } from 'graphql'
import { AccountModel } from 'src/models/account.model'

export const accountType = new GraphQLObjectType<AccountModel>({
  name: 'Account',
  description: 'An account object',
  fields: () => ({
    uniqueId: {
      type: GraphQLString,
      description: 'The uniqueId of the account',
    },
    accountNumber: {
      type: GraphQLString,
      description: 'Account number used for transactions',
    },
    userId: {
      type: GraphQLString,
      description: 'Id of the user that owns the account',
    },
    balance: {
      type: GraphQLString,
      description: 'The current balance of the account',
    },
  }),
})
