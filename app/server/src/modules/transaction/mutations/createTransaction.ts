import { GraphQLFloat, GraphQLNonNull, GraphQLString } from 'graphql'
import { ETransactionEnumType } from '../transactionType'
import { mutationWithClientMutationId } from 'graphql-relay'
import { updateBalance } from 'src/services/accountServices'
import { jwtValidation } from 'src/utils/jwt'
import {
  createDepositTransaction,
  createTransaction,
  idempotencyCheck,
  transactionAccountValidations,
  verifyBalance,
} from 'src/services/transactionServices'
import { JwtPayload } from 'jsonwebtoken'
import { TokenError } from 'src/utils/tokenError'
import mongoose from 'mongoose'

export type TransactionData = {
  sender: string
  receiver: string
  amount: number
  type: string
  description?: string
}

enum ETransactionMessageResponse {
  SUCCEED = 'Transaction have been processed sucessfuly.',
  EXISTED = 'Transaction have already been processed.',
}

const mutation = mutationWithClientMutationId({
  name: 'CreateTransaction',
  inputFields: {
    sender: {
      type: new GraphQLNonNull(GraphQLString),
    },
    receiver: {
      type: new GraphQLNonNull(GraphQLString),
    },
    amount: {
      type: new GraphQLNonNull(GraphQLFloat),
    },
    type: {
      type: new GraphQLNonNull(ETransactionEnumType),
    },
    description: {
      type: GraphQLString,
    },
  },
  mutateAndGetPayload: async (data: TransactionData, ctx) => {
    const { jwt, idempotencyId } = ctx

    const decodedPayload = (await jwtValidation(jwt)) as JwtPayload

    if (decodedPayload.taxId !== data.sender) {
      throw new TokenError({
        name: 'UnauthorizedToken',
        message: 'This token is not authorized to perform this action.',
      })
    }

    const invalidTransaction = await idempotencyCheck(idempotencyId)

    if (invalidTransaction === false) {
      const { senderAccount, receiverAccount } =
        await transactionAccountValidations(data)
      // Inicia a session
      const session = await mongoose.startSession({
        defaultTransactionOptions: { readConcern: { level: 'majority' } },
      })
      switch (data.type) {
        case 'DEPOSIT':
          await createDepositTransaction(data, idempotencyId, session)
          await updateBalance(receiverAccount.accountNumber, session)

          break
        case 'TRANSFER':
          await verifyBalance(data.amount, senderAccount)
          await createTransaction(data, idempotencyId, session)

          await updateBalance(senderAccount.accountNumber, session)
          await updateBalance(receiverAccount.accountNumber, session)

          break
      }

      // Finaliza a session
      await session.commitTransaction()
      await session.endSession()
      return {
        message: ETransactionMessageResponse.SUCCEED,
      }
    }
    return {
      message: ETransactionMessageResponse.EXISTED,
    }
  },
  outputFields: {
    message: {
      type: GraphQLString,
      resolve: async (payload) => (await payload).message,
    },
  },
})

export const CreateTransactionMutation = {
  ...mutation,
}
