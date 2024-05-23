import { GraphQLNonNull, GraphQLString } from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay'
import { userType } from '../userType'

const mutations = mutationWithClientMutationId({
  name: 'LoginUser',
  inputFields: {
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  outputFields: {
    user: {
      type: userType,
      resolve: (user: any) => `${user}`,
    },
    token: {
      type: GraphQLString,
      resolve: (token: any) => `${token}`,
    },
  },
  mutateAndGetPayload: async (input) => {
    // Validacao para logar o usuario
    return {
      content: input.content,
    }
  },
})

export const LoginUserMutation = {
  ...mutations,
}
