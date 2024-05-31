import { Meta, StoryObj } from '@storybook/react'
import LoadingSpinner from '@/components/LoadingSpinner'

const meta: Meta<typeof LoadingSpinner> = {
  title: 'Components/LoadingSpinner',
  component: LoadingSpinner,
  parameters: {
    backgrounds: {
      default: 'light',
    },
  },
}

export default meta

type Story = StoryObj<typeof LoadingSpinner>

export const Default: Story = {}
