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

const loginFormSchema = z.object({
  taxId: z
    .string({
      required_error: 'tax identification is required',
    })
    .refine((doc) => {
      const replacedDoc = doc.replace(/\D/g, '')
      return replacedDoc.length === 11 || replacedDoc.length === 14
    }, 'tax identification must be 11 characters for CPF or 14 characters for CNPJ.')
    .refine((doc) => {
      const replacedDoc = doc.replace(/\D/g, '')
      return /^[0-9]+$/.test(replacedDoc)
    }, 'tax identification must contain only numbers.'),
  password: z
    .string({
      required_error: 'Password is required.',
    })
    .min(8, { message: 'Password must be at least 8 characters long.' }),
})

export function LoginForm() {
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      taxId: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    console.log(values)
    //Autenticar
    navigate('/home')
    // }
  }

  return (
    <>
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
          <Button type="submit" className="buttonForm">
            Submit
          </Button>
        </form>
      </Form>
    </>
  )
}
