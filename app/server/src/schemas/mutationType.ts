import { GraphQLObjectType } from 'graphql'
import { userMutations } from '@/modules/user/mutations/userMutations'
import { transactionMutation } from '@/modules/transaction/mutations/transactionMutations'

export const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...userMutations,
    ...transactionMutation,
  }),
})
