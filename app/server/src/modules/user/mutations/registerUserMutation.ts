import { GraphQLNonNull, GraphQLString } from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay'

const mutations = mutationWithClientMutationId({
  name: 'RegisterUser',
  inputFields: {
    firstName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    lastName: {
      type: GraphQLString,
    },
    taxId: {
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async (input) => {
    //Validacao para criar o usuario
    return {
      content: input.content,
    }
  },
  outputFields: {
    // Retorno do token de autenticacao
  },
})

export const RegisterUserMutation = {
  ...mutations,
}
