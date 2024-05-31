import Header from '@/components/Header'
import LoadingSpinner from '@/components/LoadingSpinner'
import { Suspense, lazy } from 'react'

const BalanceCard = lazy(() => import('@/components/BalanceCard'))
const TransactionsList = lazy(() => import('@/components/TransactionsList'))

function HomePage() {
  return (
    <div className="app-container">
      <Suspense fallback={<LoadingSpinner />}>
        <Header />
        <div className="content-container">
          <BalanceCard />
          <TransactionsList />
        </div>
      </Suspense>
    </div>
  )
}

export default HomePage
