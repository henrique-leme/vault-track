import { AuthProvider } from './context/AuthContext'
import AppWithProviders from './provider/AppWithProviders'

function App() {
  return (
    <AuthProvider>
      <AppWithProviders />
    </AuthProvider>
  )
}

export default App
