import {
  GraphQLFloat,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql'
import { ETransactionEnumType } from '../transactionType'
import { mutationWithClientMutationId } from 'graphql-relay'
import { updateBalance } from 'src/services/accountServices'
import { jwtValidation } from 'src/utils/jwt'

type TransactionData = {
  sender: number
  receiver: number
  amount: number
  type: string
  description?: string
}

const mutations = mutationWithClientMutationId({
  name: 'CreateTransaction',
  inputFields: {
    sender: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    receiver: {
      type: new GraphQLNonNull(GraphQLInt),
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
  mutateAndGetPayload: async (data: TransactionData) => {
    // Validar JWT
    await jwtValidation('')
    // Validar Contas da Transacao e Saldo
    await transactionAccountValidations()
    // Criar Transacao
    await createTransaction()
    // Atualizar Saldo
    await updateBalance()
  },
  outputFields: {},
})

export const TransactionMutation = {
  ...mutations,
}
