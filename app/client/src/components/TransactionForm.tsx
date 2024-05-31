import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Inputmask from 'inputmask'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import CustomAlertDialog from './ErrorDialog'
import { useMutation } from 'react-relay'
import { CreateTransactionMutation } from './graphql/CreateTransactionMutation'
import { useAuth } from '@/context/AuthContext'
import { useParams } from 'react-router-dom'

const transactionFormSchema = z.object({
  receiver: z
    .string({ required_error: 'Receiver taxId is required' })
    .refine((doc) => {
      const replacedDoc = doc.replace(/\D/g, '')
      return replacedDoc.length === 11 || replacedDoc.length === 14
    }, 'Tax identification must be 11 characters for CPF or 14 characters for CNPJ.')
    .refine((doc) => {
      const replacedDoc = doc.replace(/\D/g, '')
      return /^[0-9]+$/.test(replacedDoc)
    }, 'Tax identification must contain only numbers.'),
  amount: z
    .number({
      required_error: 'Amount is required',
    })
    .positive({ message: 'Amount must be positive' }),
  description: z.string().optional(),
})

export function TransactionForm() {
  const { authState, setIdempotencyId } = useAuth()
  const { idempotencyId } = useParams<{ idempotencyId: string }>()
  const [commit, isInFlight] = useMutation(CreateTransactionMutation)
  const [messageType, setMessage] = useState('')
  const [alertType, setAlertType] = useState<'error' | 'warning' | 'info'>(
    'info',
  )
  const [showDialog, setShowDialog] = useState(false)
  const form = useForm<z.infer<typeof transactionFormSchema>>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      receiver: '',
      amount: 0,
      description: '',
    },
  })
  const receiverRef = useRef(null)

  useEffect(() => {
    if (receiverRef.current) {
      Inputmask({
        mask: [
          '999.999.999-99', // CPF format
          '99.999.999/9999-99', // CNPJ format
        ],
        keepStatic: true,
        showMaskOnHover: false,
        showMaskOnFocus: true,
      }).mask(receiverRef.current)
    }
  }, [])

  useEffect(() => {
    if (idempotencyId) {
      setIdempotencyId(idempotencyId)
    }
  }, [idempotencyId, setIdempotencyId])

  async function onSubmit(values: z.infer<typeof transactionFormSchema>) {
    const variables = {
      sender: authState.user?.taxId,
      receiver: values.receiver,
      amount: values.amount,
      type: 'TRANSFER',
      description: values.description,
    }

    commit({
      variables,
      onCompleted: (response?: any, errors?: any) => {
        if (errors) {
          setMessage(errors[0].message)
          setAlertType('error')
          setShowDialog(true)
          return
        }
        if (response.CreateTransaction.message) {
          setMessage(response.CreateTransaction.message)
          setAlertType('info')
          setShowDialog(true)
        } else {
          setMessage('Unknown error occurred')
          setAlertType('error')
          setShowDialog(true)
        }
      },
      onError: (err) => {
        setMessage(err.message)
        setAlertType('error')
        setShowDialog(true)
      },
    })
  }

  return (
    <>
      {messageType && <p className="error-message">{messageType}</p>}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="receiver"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Receiver tax identification..."
                    {...field}
                    ref={receiverRef}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Transaction value..."
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Description (optional)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="form-button-container">
            <Button type="submit" variant="formButton" disabled={isInFlight}>
              Submit
            </Button>
          </div>
        </form>
      </Form>
      {showDialog && (
        <CustomAlertDialog
          open={showDialog}
          onClose={() => setShowDialog(false)}
          message={messageType}
          type={alertType}
        />
      )}
    </>
  )
}
