import Header from '@/components/Header'
import { TransactionForm } from '@/components/TransactionForm'

function TransactionPage() {
  return (
    <>
      <Header />

      <div className="container">
        <div className="form-card">
          <h1>Transaction</h1>
          <TransactionForm />
        </div>
      </div>
    </>
  )
}

export default TransactionPage
