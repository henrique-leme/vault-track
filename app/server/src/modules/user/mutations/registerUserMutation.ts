import { GraphQLNonNull, GraphQLString } from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay'
import { userType } from '../userType'
import { createUser, validateExistingUser } from 'src/services/userServices'

export type RegisterUserData = {
  firstName: string
  lastName?: string
  taxId: string
  password: string
}

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
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async (data: RegisterUserData) => {
    //Validacao para criar o usuario
    await validateExistingUser(data.taxId)
    const user = await createUser(data)

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
