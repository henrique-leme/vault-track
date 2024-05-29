import { GraphQLNonNull, GraphQLString } from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay'
import { updateUser, validateUserAndPassword } from 'src/services/userServices'
import { jwtValidation } from 'src/utils/jwt'
import { userType } from '../userType'
import { JwtPayload } from 'jsonwebtoken'

export type UpdateUserData = {
  password: string
  firstName?: string
  lastName?: string
  newPassword?: string
}

const mutation = mutationWithClientMutationId({
  name: 'UpdateUser',
  inputFields: {
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
    firstName: {
      type: GraphQLString,
    },
    lastName: {
      type: GraphQLString,
    },
    newPassword: {
      type: GraphQLString,
    },
  },
  mutateAndGetPayload: async (data: UpdateUserData, ctx) => {
    const { jwt } = ctx

    const decodedPayload = (await jwtValidation(jwt)) as JwtPayload

    await validateUserAndPassword(decodedPayload.taxId, data.password)

    const updatedUser = await updateUser(decodedPayload.taxId, data)

    return {
      updatedUser,
    }
  },
  outputFields: {
    updateUser: {
      type: userType,
      resolve: async (payload) => (await payload).updatedUser,
    },
  },
})

export const UpdateUserMutation = {
  ...mutation,
}
