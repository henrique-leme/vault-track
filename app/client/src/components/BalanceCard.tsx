import { useAuth } from '@/context/AuthContext'
import { Button } from './ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { useLazyLoadQuery } from 'react-relay'
import { AccountWithBalance } from './graphql/AccountWithBalance'
import { useNavigate } from 'react-router-dom'
import { idempotentRouteId } from '@/lib/idempotencyId'
import { AccountWithBalanceQuery } from './graphql/__generated__/AccountWithBalanceQuery.graphql'

const BalanceCard = () => {
  const { authState } = useAuth()
  const data = useLazyLoadQuery<AccountWithBalanceQuery>(AccountWithBalance, {
    taxId: authState?.user?.taxId ?? '',
  })
  const navigate = useNavigate()

  const account = data?.accountWithUpdatedBalance?.edges?.[0]?.node

  return (
    <div className="balance-card">
      <Card>
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
              account &&
              navigate(`/deposit${idempotentRouteId(account.uniqueId ?? '')}`)
            }
          >
            Deposit
          </Button>
          <Button
            variant="balanceCard"
            className="balance-card-button"
            onClick={() =>
              account &&
              navigate(
                `/transaction${idempotentRouteId(account.uniqueId ?? '')}`,
              )
            }
          >
            Transaction
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default BalanceCard
