import BalanceCard from '@/components/BalanceCard'
import Menu from '@/components/DropdownMenu'
import { buttonVariants } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <>
      <Menu />
      <BalanceCard />
      <Card>
        <Link className={buttonVariants({ variant: 'outline' })} to={''}>
          Click here
        </Link>{' '}
        <Link className={buttonVariants({ variant: 'outline' })} to={''}>
          Click here
        </Link>{' '}
      </Card>
    </>
  )
}

export default HomePage
