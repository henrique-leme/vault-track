// src/components/DepositForm.stories.tsx
import { Meta, StoryObj } from '@storybook/react'
import { DepositForm } from '@/components/DepositForm'
import { RelayEnvironmentProvider } from 'react-relay/hooks'
import { createMockEnvironment, MockPayloadGenerator } from 'relay-test-utils'
import { AuthProvider } from '@/context/AuthContext'
import { BrowserRouter } from 'react-router-dom'

// Configurar o mock do ambiente Relay
const mockEnvironment = createMockEnvironment()

mockEnvironment.mock.queueOperationResolver((operation) =>
  MockPayloadGenerator.generate(operation),
)

const meta: Meta<typeof DepositForm> = {
  title: 'Components/DepositForm',
  component: DepositForm,
  decorators: [
    (Story) => (
      <RelayEnvironmentProvider environment={mockEnvironment}>
        <AuthProvider>
          <BrowserRouter>
            <Story />
          </BrowserRouter>
        </AuthProvider>
      </RelayEnvironmentProvider>
    ),
  ],
  parameters: {
    backgrounds: {
      default: 'light',
    },
  },
}

export default meta

type Story = StoryObj<typeof DepositForm>

export const Default: Story = {}
