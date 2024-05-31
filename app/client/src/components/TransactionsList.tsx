import { useLazyLoadQuery } from 'react-relay'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'
import { useAuth } from '@/context/AuthContext'
import { TransactionsListQuery as TransactionList } from './graphql/TransactionsListQuery'
import { AccountWithBalance } from './graphql/AccountWithBalance'
import { AccountWithBalanceQuery } from './graphql/__generated__/AccountWithBalanceQuery.graphql'
import { TransactionsListQuery } from './graphql/__generated__/TransactionsListQuery.graphql'

const TransactionsList = () => {
  const { authState } = useAuth()

  const accountData = useLazyLoadQuery<AccountWithBalanceQuery>(
    AccountWithBalance,
    {
      taxId: authState?.user?.taxId || '',
    },
  )

  const account = accountData?.accountWithUpdatedBalance?.edges?.[0]?.node

  const transactionsData = useLazyLoadQuery<TransactionsListQuery>(
    TransactionList,
    {
      accountNumber: account?.accountNumber || '',
    },
  )

  if (!account || !transactionsData) {
    return <div>Loading...</div>
  }

  const transactions =
    transactionsData?.AccountTransactions?.edges
      ?.map((edge) => edge?.node)
      .reverse() || []

  return (
    <div className="transaction-list-container">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>TYPE</TableHead>
            <TableHead>AMOUNT</TableHead>
            <TableHead>RECEIVER</TableHead>
            <TableHead>SENDER</TableHead>
            <TableHead>DESCRIPTION</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.length > 0 ? (
            transactions.map((transaction, index) => (
              <TableRow key={index}>
                <TableCell>{transaction?.type}</TableCell>
                <TableCell>${transaction?.amount}</TableCell>
                <TableCell>{transaction?.receiver}</TableCell>
                <TableCell>{transaction?.sender}</TableCell>
                <TableCell>{transaction?.description}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5}>No transactions available</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default TransactionsList
