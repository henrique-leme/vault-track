import {
  connectionDefinitions,
  connectionArgs,
  connectionFromArray,
} from 'graphql-relay'
import { GraphQLString } from 'graphql'
import { accountType } from '../accountType'
import { findAccountAndUpdatedBalance } from 'src/services/accountServices'

const { connectionType: TransactionConnection } = connectionDefinitions({
  nodeType: accountType,
})

const connection = {
  type: TransactionConnection,
  args: {
    ...connectionArgs,
    taxId: { type: GraphQLString },
  },
  resolve: async (_: any, { taxId, ...args }: { taxId: string }) => {
    const account = await findAccountAndUpdatedBalance(taxId)

    return connectionFromArray([account], args)
  },
}

export const AccountWithUpdatedBalanceQuery = {
  ...connection,
}
