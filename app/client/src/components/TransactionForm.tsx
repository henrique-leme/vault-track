import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
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
import { useState } from 'react'

const transactionFormSchema = z.object({
  amount: z
    .number({
      required_error: 'Amount is required',
    })
    .positive({ message: 'Amount must be positive' }),
  recipient: z
    .string({
      required_error: 'Recipient is required',
    })
    .min(1, { message: 'Recipient is required' }),
  description: z.string().optional(),
})

export function TransactionForm() {
  const [errorMessage, setErrorMessage] = useState('')
  const [showDialog, setShowDialog] = useState(false)
  const form = useForm<z.infer<typeof transactionFormSchema>>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      amount: 0,
      recipient: '',
      description: '',
    },
  })

  async function onSubmit(values: z.infer<typeof transactionFormSchema>) {
    try {
      // Aqui você pode adicionar a lógica de submissão, por exemplo, chamar uma API
      console.log('Transaction values:', values)
      // Após a submissão, você pode redirecionar ou exibir uma mensagem de sucesso
    } catch (error) {
      setErrorMessage('An error occurred while processing the transaction')
      setShowDialog(true)
    }
  }

  return (
    <>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Amount" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="recipient"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Recipient" {...field} />
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
            <Button type="submit" variant="formButton">
              Submit
            </Button>
          </div>
        </form>
      </Form>
      {showDialog && (
        <CustomAlertDialog
          open={showDialog}
          onClose={() => setShowDialog(false)}
          message={errorMessage}
          type="error"
        />
      )}
    </>
  )
}
