import {
  AlertDialogProps,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
} from '@radix-ui/react-alert-dialog'
import { AlertDialogHeader, AlertDialogFooter } from './ui/alert-dialog'

interface CustomAlertDialogProps extends AlertDialogProps {
  message: string
  type: 'error' | 'warning' | 'info'
  onClose: () => void
}

const CustomAlertDialog = ({
  message,
  type,
  onClose,
  ...props
}: CustomAlertDialogProps) => {
  return (
    <AlertDialog {...props}>
      <AlertDialogTrigger asChild>
        <button style={{ display: 'none' }}>Open</button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {type === 'error'
              ? 'Error'
              : type === 'warning'
                ? 'Warning'
                : 'Info'}
          </AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={onClose}>Close</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default CustomAlertDialog
