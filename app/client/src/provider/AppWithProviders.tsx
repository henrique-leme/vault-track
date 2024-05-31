import { useMemo } from 'react'
import { RouterProvider } from 'react-router-dom'
import { RelayEnvironmentProvider } from 'react-relay'
import { routes } from '@/routes'
import { useAuth } from '@/context/AuthContext'
import { createRelayEnvironment } from '../relay/RelayEnvironment'

function AppWithProviders() {
  const { authState } = useAuth()

  const relayEnvironment = useMemo(
    () =>
      createRelayEnvironment(authState.token, authState.idempotencyId ?? ''),
    [authState.token, authState.idempotencyId],
  )

  return (
    <RelayEnvironmentProvider environment={relayEnvironment}>
      <RouterProvider router={routes} />
    </RelayEnvironmentProvider>
  )
}

export default AppWithProviders
