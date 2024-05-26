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
} from 'src/services/transactionServices'

export type TransactionData = {
  sender: string
  receiver: string
  amount: number
  type: string
  description?: string
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
      const { accountNumber } = await transactionAccountValidations(data)
      switch (data.type) {
        case 'DEPOSIT':
          await createDepositTransaction(data, idempotencyId)
          await updateBalance(accountNumber)

          break
        case 'TRANSFER':
          await createTransaction(data, idempotencyId)
          await updateBalance(accountNumber)

          break
      }
    }
    return
  },
  outputFields: {},
})

export const CreateTransactionMutation = {
  ...mutation,
}
