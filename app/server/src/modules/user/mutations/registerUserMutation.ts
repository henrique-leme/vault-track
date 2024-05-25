import { GraphQLNonNull, GraphQLString } from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay'
import { createUser, validateExistingUser } from 'src/services/userServices'
import { userType } from '../userType'
import { generateJwt } from 'src/utils/jwt'

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
    await validateExistingUser(data.taxId)
    const user = await createUser(data)

    const jwt = await generateJwt(user.taxId)

    return {
      user,
      jwt,
    }
  },
  outputFields: {
    user: {
      type: userType,
      resolve: async (payload) => (await payload).user,
    },
    jwt: {
      type: GraphQLString,
      resolve: async (payload) => (await payload).jwt,
    },
  },
})

export const RegisterUserMutation = {
  ...mutations,
}
