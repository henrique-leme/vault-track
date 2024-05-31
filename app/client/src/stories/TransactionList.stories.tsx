import { Meta, StoryObj } from '@storybook/react'
import TransactionsList from '@/components/TransactionsList'
import { AuthProvider } from '@/context/AuthContext'
import { BrowserRouter } from 'react-router-dom'
import { RelayEnvironmentProvider } from 'react-relay/hooks'
import { createMockEnvironment, MockPayloadGenerator } from 'relay-test-utils'

const mockEnvironment = createMockEnvironment()

mockEnvironment.mock.queueOperationResolver((operation) => {
  return MockPayloadGenerator.generate(operation, {
    AccountWithBalance: () => ({
      accountWithUpdatedBalance: {
        edges: [
          {
            node: {
              accountNumber: '123456789',
              balance: 1000,
            },
          },
        ],
      },
    }),
    TransactionsListQuery: () => ({
      AccountTransactions: {
        edges: [
          {
            node: {
              type: 'DEPOSIT',
              amount: 100,
              receiver: '987654321',
              sender: '123456789',
              description: 'Deposit',
            },
          },
          {
            node: {
              type: 'TRANSACTION',
              amount: 50,
              receiver: '123456789',
              sender: '987654321',
              description: 'Transaction',
            },
          },
        ],
      },
    }),
  })
})

const meta: Meta<typeof TransactionsList> = {
  title: 'Components/TransactionsList',
  component: TransactionsList,
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

type Story = StoryObj<typeof TransactionsList>

export const Default: Story = {
  args: {},
}
