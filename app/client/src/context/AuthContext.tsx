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
  })

  const login = (token: string, user: User) => {
    setAuthState({ token, user })
  }

  const logout = () => {
    setAuthState({ token: '', user: null })
  }

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
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
