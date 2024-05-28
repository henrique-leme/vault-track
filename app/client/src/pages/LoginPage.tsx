import { LoginForm } from '@/components/LoginForm'
import { Link } from 'react-router-dom'

function LoginPage() {
  return (
    <>
      <div className="container">
        <h1>Welcome to VaultTrack</h1>
        <p>
          Enjoy all the features that make it easy for you to manage your
          finances
        </p>
        <LoginForm />
        <p>
          Don't have an account yet? <Link to="/register">Register</Link>
        </p>
      </div>
    </>
  )
}

export default LoginPage
