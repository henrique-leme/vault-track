import BackButton from '@/components/BackButton'
import { Meta, StoryObj } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'

const meta: Meta<typeof BackButton> = {
  component: BackButton,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  parameters: {
    backgrounds: {
      default: 'light',
    },
  },
}

export default meta

type Story = StoryObj<typeof BackButton>

export const Default: Story = {
  args: {
    returnTo: '/',
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
}
