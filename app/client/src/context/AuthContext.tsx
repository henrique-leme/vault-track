import {
  AuthContextType,
  AuthProviderProps,
  AuthState,
  User,
} from '@/lib/interfaces'
import { createContext, useContext, useState } from 'react'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, setAuthState] = useState<AuthState>({
    token: '',
    user: null,
    idempotencyId: null,
  })

  const login = (token: string, user: User) => {
    setAuthState({ token, user, idempotencyId: authState.idempotencyId })
  }

  const logout = () => {
    setAuthState({ token: '', user: null, idempotencyId: null })
  }

  const setIdempotencyId = (idempotencyId: string) => {
    setAuthState((prevState) => ({
      ...prevState,
      idempotencyId,
    }))
  }

  return (
    <AuthContext.Provider
      value={{ authState, login, logout, setIdempotencyId }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
