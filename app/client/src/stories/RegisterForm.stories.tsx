import { Meta, StoryObj } from '@storybook/react'
import { RegisterForm } from '@/components/RegisterForm'
import { AuthProvider } from '@/context/AuthContext'
import { BrowserRouter } from 'react-router-dom'
import { RelayEnvironmentProvider } from 'react-relay/hooks'
import { createMockEnvironment } from 'relay-test-utils'

const mockEnvironment = createMockEnvironment()

const meta: Meta<typeof RegisterForm> = {
  title: 'Components/RegisterForm',
  component: RegisterForm,
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

type Story = StoryObj<typeof RegisterForm>

export const Default: Story = {
  args: {},
}
