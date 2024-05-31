import { useEffect, useRef, useState } from 'react'
import { useMutation } from 'react-relay'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Inputmask from 'inputmask'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { RegisterUserMutation } from './graphql/RegisterUserMutation'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import CustomAlertDialog from './CustomAlertDialog'
import { User } from '@/lib/interfaces'

const registerFormSchema = z
  .object({
    firstName: z.string({ required_error: 'First name is required' }),
    lastName: z.string({}),
    taxId: z
      .string({
        required_error: 'Tax identification is required',
      })
      .refine((doc) => {
        const replacedDoc = doc.replace(/\D/g, '')
        return replacedDoc.length === 11 || replacedDoc.length === 14
      }, 'Tax identification must be 11 characters for CPF or 14 characters for CNPJ.')
      .refine((doc) => {
        const replacedDoc = doc.replace(/\D/g, '')
        return /^[0-9]+$/.test(replacedDoc)
      }, 'Tax identification must contain only numbers.'),
    password: z
      .string({
        required_error: 'Password is required.',
      })
      .min(8, { message: 'Password must be at least 8 characters long.' }),
    repeatPassword: z.string({
      required_error: 'Repeat your password.',
    }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.repeatPassword) {
      ctx.addIssue({
        code: 'custom',
        path: ['repeatPassword'],
        message: 'Passwords must match.',
      })
    }
  })

export function RegisterForm() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [errorMessage, setErrorMessage] = useState('')
  const [showDialog, setShowDialog] = useState(false)
  const [commit, isInFlight] = useMutation(RegisterUserMutation)
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      taxId: '',
      password: '',
      repeatPassword: '',
    },
  })
  const taxIdRef = useRef(null)

  useEffect(() => {
    if (taxIdRef.current) {
      Inputmask({
        mask: ['999.999.999-99', '99.999.999/9999-99'],
        keepStatic: true,
        showMaskOnHover: false,
        showMaskOnFocus: true,
      }).mask(taxIdRef.current)
    }
  }, [])

  async function onSubmit(values: z.infer<typeof registerFormSchema>) {
    const variables = {
      input: {
        firstName: values.firstName,
        lastName: values.lastName,
        taxId: values.taxId,
        password: values.password,
      },
    }

    commit({
      variables,
      onCompleted: (
        response?: {
          RegisterUser?: { jwt: string; user: User }
        },
        errors?: any,
      ) => {
        if (errors) {
          setErrorMessage(errors[0].message)
          setShowDialog(true)
          return
        }
        if (response?.RegisterUser) {
          const { jwt, user } = response.RegisterUser
          login(jwt, user)
          navigate('/home')
        } else {
          setErrorMessage('Unknown error occurred')
          setShowDialog(true)
        }
      },
      onError: (err) => {
        setErrorMessage(err.message)
        setShowDialog(true)
      },
    })
  }

  return (
    <>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Your first name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Your last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="taxId"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Tax identification..."
                    {...field}
                    ref={taxIdRef}
                  />
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
                  <Input type="password" placeholder="Password..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="repeatPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Repeat your password..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="form-button-container">
            <Button type="submit" variant="formButton" disabled={isInFlight}>
              Register
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
