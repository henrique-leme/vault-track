import { GraphQLObjectType } from 'graphql'
import { userMutations } from '@/modules/user/mutations/userMutations'
import { transactionMutations } from '@/modules/transaction/mutations/transactionMutations'

export const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...userMutations,
    ...transactionMutations,
  }),
})
