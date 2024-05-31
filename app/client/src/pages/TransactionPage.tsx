import BackButton from '@/components/BackButton'
import Header from '@/components/Header'
import { TransactionForm } from '@/components/TransactionForm'

function TransactionPage() {
  return (
    <>
      <Header />
      <div className="container">
        <div className="form-card">
          <BackButton returnTo="/home" />
          <h1 className="mt-10">Transaction</h1>
          <TransactionForm />
        </div>
      </div>
    </>
  )
}

export default TransactionPage
