import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
} from '@radix-ui/react-alert-dialog'
import { AlertDialogHeader, AlertDialogFooter } from './ui/alert-dialog'
import { CustomAlertDialogProps } from '@/lib/interfaces'

const CustomAlertDialog = ({
  message,
  type,
  onClose,
  onConfirm,
  ...props
}: CustomAlertDialogProps) => {
  return (
    <AlertDialog {...props}>
      <AlertDialogTrigger asChild></AlertDialogTrigger>
      <AlertDialogContent className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg p-6 sm:max-w-[425px]">
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
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="text-right"></span>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogAction className="flex" onClick={onClose}>
              Close
            </AlertDialogAction>
            {onConfirm && (
              <AlertDialogAction className="flex" onClick={onConfirm}>
                Confirm
              </AlertDialogAction>
            )}
          </AlertDialogFooter>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default CustomAlertDialog
