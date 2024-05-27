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

    await jwtValidation(jwt)
    const invalidTransaction = await idempotencyCheck(idempotencyId)

    if (invalidTransaction === false) {
      const { senderAccount, receiverAccount } =
        await transactionAccountValidations(data)
      switch (data.type) {
        case 'DEPOSIT':
          await createDepositTransaction(data, idempotencyId)
          await updateBalance(receiverAccount.accountNumber)

          break
        case 'TRANSFER':
          await verifyBalance(data.amount, senderAccount)
          await createTransaction(data, idempotencyId)

          await updateBalance(senderAccount.accountNumber)
          await updateBalance(receiverAccount.accountNumber)

          break
      }
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
