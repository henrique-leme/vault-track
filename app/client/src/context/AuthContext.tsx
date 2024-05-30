import { createContext, useContext, useState, ReactNode } from 'react'

interface User {
  firstName: string
  lastName: string
  taxId: string
}

interface AuthState {
  token: string
  user: User | null
}

interface AuthContextType {
  authState: AuthState
  login: (token: string, user: User) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

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
