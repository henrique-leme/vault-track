import { Meta, StoryObj } from '@storybook/react'
import UpdateUserForm from '@/components/UpdateUserForm'
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
    UpdateUserMutation: () => ({
      updateUser: {
        message: 'Profile updated successfully',
      },
    }),
    DeleteUserMutation: () => ({
      deleteUser: {
        message: 'Profile deleted successfully',
      },
    }),
  })
})

const meta: Meta<typeof UpdateUserForm> = {
  title: 'Components/UpdateUserForm',
  component: UpdateUserForm,
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

type Story = StoryObj<typeof UpdateUserForm>

export const Default: Story = {
  args: {},
}
