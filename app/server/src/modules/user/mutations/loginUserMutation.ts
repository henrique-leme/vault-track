import { GraphQLNonNull, GraphQLString } from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay'
import { validateUserLogin } from 'src/services/userServices'
import { generateJwt } from 'src/utils/jwt'

export type LoginUserData = {
  taxId: string
  password: string
}

const mutations = mutationWithClientMutationId({
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
    await validateUserLogin(data)

    const jwt = await generateJwt(data.taxId)

    return {
      jwt,
    }
  },
  outputFields: {
    jwt: {
      type: GraphQLString,
      resolve: async (payload) => (await payload).jwt,
    },
  },
})

export const LoginUserMutation = {
  ...mutations,
}
