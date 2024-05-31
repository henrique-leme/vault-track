import { Meta, StoryObj } from '@storybook/react'
import Header from '@/components/Header'
import { AuthProvider } from '@/context/AuthContext'
import { BrowserRouter } from 'react-router-dom'
import { RelayEnvironmentProvider } from 'react-relay/hooks'
import { createMockEnvironment } from 'relay-test-utils'

const mockEnvironment = createMockEnvironment()

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
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

type Story = StoryObj<typeof Header>

export const Default: Story = {
  args: {},
  play: async () => {},
}
