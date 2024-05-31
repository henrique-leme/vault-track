import { useAuth } from '@/context/AuthContext'
import { Button } from './ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { useLazyLoadQuery } from 'react-relay'
import { AccountWithBalance } from './graphql/AccountWithBalance'
import { useNavigate } from 'react-router-dom'
import { idempotentRouteId } from '@/lib/idempotencyId'

const BalanceCard = () => {
  const { authState } = useAuth()
  const data: any = useLazyLoadQuery(AccountWithBalance, {
    taxId: authState?.user?.taxId,
  })
  const navigate = useNavigate()

  const account = data.accountWithUpdatedBalance.edges[0]?.node

  return (
    <Card className="balance-card">
      <CardHeader>
        <CardTitle>Account Balance</CardTitle>
      </CardHeader>
      <CardContent>
        {account ? (
          <>
            <div>Account Number: {account.accountNumber}</div>
            <div>Balance: ${account.balance}</div>
          </>
        ) : (
          <div>No account data available</div>
        )}
      </CardContent>
      <CardFooter className="balance-card-footer">
        <Button
          variant="balanceCard"
          className="balance-card-button"
          onClick={() =>
            navigate(`/deposit${idempotentRouteId(account.uniqueId)}`)
          }
        >
          Deposit
        </Button>
        <Button
          variant="balanceCard"
          className="balance-card-button"
          onClick={() =>
            navigate(`/transaction${idempotentRouteId(account.uniqueId)}`)
          }
        >
          Transaction
        </Button>
      </CardFooter>
    </Card>
  )
}

export default BalanceCard
