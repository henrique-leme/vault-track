import { createBrowserRouter } from 'react-router-dom'
import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'
import HomePage from './pages/HomePage'
import { RequireAuth } from './middleware'
import TransactionPage from './pages/TransactionPage'

export const routes: ReturnType<typeof createBrowserRouter> =
  createBrowserRouter([
    {
      path: '/',
      element: <LoginPage />,
    },
    {
      path: '/register',
      element: <RegisterPage />,
    },
    {
      path: '/home',
      element: (
        <RequireAuth>
          <HomePage />
        </RequireAuth>
      ),
    },
    {
      path: '/transaction',
      element: (
        <RequireAuth>
          <TransactionPage />
        </RequireAuth>
      ),
    },
    // {
    //   path: '/deposit',
    //   element: <RDepositPage />,
    // },
  ])
