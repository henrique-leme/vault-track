import { GraphQLNonNull, GraphQLString } from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay'
import {
  deleteUserByTaxId,
  validateUserExists,
} from 'src/services/userServices'
import { userType } from '../userType'
import { jwtValidation } from 'src/utils/jwt'
import { JwtPayload } from 'jsonwebtoken'
import { TokenError } from 'src/utils/tokenError'
import { deleteAccount, findAccountByTaxId } from 'src/services/accountServices'

export type DeleteUserData = {
  taxId: string
}

const mutation = mutationWithClientMutationId({
  name: 'DeleteUser',
  inputFields: {
    jwt: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async (data: DeleteUserData, ctx) => {
    const { jwt } = ctx

    await validateUserExists(data.taxId)
    const decodedPayload = (await jwtValidation(jwt)) as JwtPayload

    if (decodedPayload.taxId !== data.taxId) {
      throw new TokenError({
        name: 'UnauthorizedToken',
        message: 'This token is not authorized to perform this action.',
      })
    }

    const account = await findAccountByTaxId(data.taxId)

    await deleteAccount(account.accountNumber)
    await deleteUserByTaxId(data.taxId)

    return {
      deletedUser: { taxId: data.taxId, accountNumber: account.accountNumber },
      message: 'User have been deleted successfully.',
    }
  },
  outputFields: {
    deletedUser: {
      type: userType,
      resolve: async (payload) => (await payload).deletedUser,
    },
    message: {
      type: GraphQLString,
      resolve: async (payload) => (await payload).message,
    },
  },
})

export const DeleteUserMutation = {
  ...mutation,
}
