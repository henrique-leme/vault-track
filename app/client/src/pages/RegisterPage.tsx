import BackButton from '@/components/BackButton'
import { RegisterForm } from '@/components/RegisterForm'

function RegisterPage() {
  return (
    <div className="container">
      <div className="form-card">
        <BackButton returnTo="/" />
        <h1 className="mt-10">Register</h1>
        <RegisterForm />
      </div>
    </div>
  )
}

export default RegisterPage
