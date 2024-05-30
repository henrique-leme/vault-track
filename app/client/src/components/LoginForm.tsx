import { useMutation } from 'react-relay'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { Textarea } from './ui/textarea'
import { useAuth } from '@/context/AuthContext'
import { SetStateAction, useState } from 'react'
import CustomAlertDialog from './ErrorDialog'
import { LoginUserMutation } from './graphql/LoginUserMutation'

const loginFormSchema = z.object({
  taxId: z
    .string({
      required_error: 'Tax identification is required',
    })
    .refine((doc) => {
      const replacedDoc = doc.replace(/\D/g, '')
      return replacedDoc.length === 11 || replacedDoc.length === 14
    }, 'Tax identification must be 11 characters for CPF ou 14 characters for CNPJ.')
    .refine((doc) => {
      const replacedDoc = doc.replace(/\D/g, '')
      return /^[0-9]+$/.test(replacedDoc)
    }, 'Tax identification must contain only numbers.'),
  password: z
    .string({
      required_error: 'Password is required.',
    })
    .min(8, { message: 'Password must be at least 8 characters long.' }),
})

export function LoginForm() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [commit, isInFlight] = useMutation(LoginUserMutation)
  const [errorMessage, setErrorMessage] = useState('')
  const [showDialog, setShowDialog] = useState(false)
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      taxId: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    const variables = {
      input: {
        taxId: values.taxId,
        password: values.password,
      },
    }
    commit({
      variables,
      onCompleted: (
        response?: { LoginUser?: { jwt: string; validUser: any } },
        errors?: any,
      ) => {
        if (errors) {
          setErrorMessage(errors[0].message)
          setShowDialog(true)
          return
        }
        if (response?.LoginUser) {
          const { jwt, validUser } = response.LoginUser
          login(jwt, validUser)
          navigate('/home')
        } else {
          setErrorMessage('Unknown error occurred')
          setShowDialog(true)
        }
      },
      onError: (err: { message: SetStateAction<string> }) => {
        setErrorMessage(err.message)
        setShowDialog(true)
      },
    })
  }

  return (
    <>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="taxId"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea placeholder="Tax Identification..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea placeholder="Password..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="buttonForm" disabled={isInFlight}>
            Submit
          </Button>
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
