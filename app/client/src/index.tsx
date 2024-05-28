import { RelayEnvironmentProvider } from 'react-relay'
import { RelayEnvironment } from './RelayEnvironment.ts'
import '@/styles/global.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RelayEnvironmentProvider environment={RelayEnvironment}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </RelayEnvironmentProvider>,
)
