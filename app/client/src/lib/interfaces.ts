import { AlertDialogProps } from '@radix-ui/react-alert-dialog'
import { ReactNode } from 'react'

export interface User {
  firstName: string
  lastName: string
  taxId: string
}

export interface AuthState {
  token: string
  user: User | null
}

export interface AuthContextType {
  authState: AuthState
  login: (token: string, user: User) => void
  logout: () => void
}

export interface AuthProviderProps {
  children: ReactNode
}

export interface CustomAlertDialogProps extends AlertDialogProps {
  message: string
  type: 'error' | 'warning' | 'info'
  onClose: () => void
}
