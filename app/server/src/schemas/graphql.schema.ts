import { GraphQLSchema } from 'graphql'

import { QueryType } from './queryType'
import { MutationType } from './mutationType'

export const graphqlSchema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
})
