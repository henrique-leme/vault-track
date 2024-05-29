import { accountQuery } from '@/modules/account/connections/accountQuerys'
import { transactionQuery } from '@/modules/transaction/connections/transactionQuerys'
import { GraphQLObjectType } from 'graphql'

export const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    ...transactionQuery,
    ...accountQuery,
  }),
})
