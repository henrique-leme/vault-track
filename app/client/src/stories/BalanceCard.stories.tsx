// src/components/BalanceCard.stories.tsx
import { Meta, StoryObj } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'
import { RelayEnvironmentProvider } from 'react-relay/hooks'
import { createMockEnvironment, MockPayloadGenerator } from 'relay-test-utils'
import { AuthProvider } from '@/context/AuthContext'
import BalanceCard from '@/components/BalanceCard'

const mockEnvironment = createMockEnvironment()

mockEnvironment.mock.queueOperationResolver((operation) =>
  MockPayloadGenerator.generate(operation, {
    Account: () => ({
      uniqueId: '6656f8462c8b660f06d54986',
      accountNumber: '78794515812638570000',
      balance: 1000,
    }),
  }),
)

const meta: Meta<typeof BalanceCard> = {
  title: 'Components/BalanceCard',
  component: BalanceCard,
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

type Story = StoryObj<typeof BalanceCard>

export const Default: Story = {
  args: {
    account: {
      uniqueId: '6656f8462c8b660f06d54986',
      accountNumber: '78794515812638570000',
      balance: 1000,
    },
  },
}

export const NoAccountData: Story = {
  args: {
    account: null,
  },
}
