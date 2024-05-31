import Header from '@/components/Header'
import LoadingSpinner from '@/components/LoadingSpinner'
import { Suspense, lazy } from 'react'

const BalanceCard = lazy(() => import('@/components/BalanceCard'))

function HomePage() {
  return (
    <div className="app-container">
      <Suspense fallback={<LoadingSpinner />}>
        <Header />
        <div className="content-container">
          <BalanceCard />
        </div>
      </Suspense>
    </div>
  )
}

export default HomePage
