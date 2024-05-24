import { GraphQLString } from 'graphql'

export const transactionQuery = {
  hello: {
    type: GraphQLString,
    resolve: () => 'Hello World',
  },
}
