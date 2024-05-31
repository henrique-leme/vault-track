// src/components/CustomAlertDialog.stories.tsx
import { Meta, StoryObj } from '@storybook/react'
import CustomAlertDialog from '@/components/CustomAlertDialog'

const meta: Meta<typeof CustomAlertDialog> = {
  title: 'Components/CustomAlertDialog',
  component: CustomAlertDialog,
  argTypes: {
    message: { control: 'text' },
    type: {
      control: {
        type: 'select',
        options: ['error', 'warning', 'info'],
      },
    },
    open: { control: 'boolean' },
    onClose: { action: 'closed' },
    onConfirm: { action: 'confirmed' },
  },
}

export default meta

type Story = StoryObj<typeof CustomAlertDialog>

export const Default: Story = {
  args: {
    open: true,
    message: 'This is an alert message.',
    type: 'info',
  },
}
