import BackButton from '@/components/BackButton'
import Header from '@/components/Header'
import { DepositForm } from '@/components/DepositForm'

function DepositPage() {
  return (
    <>
      <Header />
      <div className="container">
        <div className="form-card">
          <BackButton returnTo="/home" />
          <h1 className="mt-10">Deposit</h1>
          <DepositForm />
        </div>
      </div>
    </>
  )
}

export default DepositPage
