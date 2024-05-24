import { transactionQuery } from '@/modules/transaction/querys/transactionQuerys'
import { GraphQLObjectType } from 'graphql'

export const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    ...transactionQuery,
  }),
})
