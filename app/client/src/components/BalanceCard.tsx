import { Button } from './ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'

const BalanceCard = () => {
  return (
    <Card className="balanceCard">
      <CardHeader>
        <CardTitle>Account Balance</CardTitle>
      </CardHeader>
      <CardContent>
        <div>AccountNumber: 0000000000000000</div>
        <div>Balance: 000000000</div>
      </CardContent>
      <CardFooter className="balanceCardFooter">
        <Button className="balanceCardButton">Deposit</Button>
        <Button className="balanceCardButton">Transaction</Button>
      </CardFooter>
    </Card>
  )
}

export default BalanceCard
