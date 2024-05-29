import { GraphQLNonNull, GraphQLString } from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay'
import { validateUserAndPassword } from 'src/services/userServices'
import { generateJwt } from 'src/utils/jwt'
import { userType } from '../userType'

export type LoginUserData = {
  taxId: string
  password: string
}

const mutation = mutationWithClientMutationId({
  name: 'LoginUser',
  inputFields: {
    taxId: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async (data: LoginUserData) => {
    const validUser = await validateUserAndPassword(data.taxId, data.password)

    const jwt = await generateJwt(data.taxId)

    return {
      validUser,
      jwt,
    }
  },
  outputFields: {
    validUser: {
      type: userType,
      resolve: async (payload) => (await payload).validUser,
    },
    jwt: {
      type: GraphQLString,
      resolve: async (payload) => (await payload).jwt,
    },
  },
})

export const LoginUserMutation = {
  ...mutation,
}
