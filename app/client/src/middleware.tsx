import { Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import { ReactNode } from 'react'

export const RequireAuth = ({ children }: { children: ReactNode }) => {
  const { authState } = useAuth()
  const isAuthenticated = !!authState.token

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return children
}
