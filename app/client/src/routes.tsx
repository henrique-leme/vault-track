import { createBrowserRouter } from 'react-router-dom'
import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'
import HomePage from './pages/HomePage'

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
      element: <HomePage />,
    },
    // {
    //   path: '/transaction',
    //   element: <TransactionrPage />,
    // },
    // {
    //   path: '/deposit',
    //   element: <RDepositPage />,
    // },
  ])
