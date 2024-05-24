import { GraphQLNonNull, GraphQLString } from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay'
import { userType } from '../userType'
import { createUser, validateExistingUser } from 'src/services/userServices'

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
    await validateExistingUser(input.email, input.taxId)
    const user = await createUser(input)

    // Incluir Jwt
    return {
      user,
    }
  },
  outputFields: {
    user: {
      type: userType,
      resolve: (user: any) => user,
    },
  },
})

export const RegisterUserMutation = {
  ...mutations,
}
