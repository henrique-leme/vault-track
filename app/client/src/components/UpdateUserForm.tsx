import { useState } from 'react'
import { useMutation, useLazyLoadQuery } from 'react-relay'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuth } from '@/context/AuthContext'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import CustomAlertDialog from './CustomAlertDialog'
import { DeleteUserMutation } from './graphql/DeleteUserMutation'
import { UpdateUserMutation } from './graphql/UpdateUserMutation'
import { AccountWithBalance } from './graphql/AccountWithBalance'

const profileSchema = z
  .object({
    taxId: z.string(),
    firstName: z.string().min(1, 'First Name is required'),
    lastName: z.string().min(1, 'Last Name is required'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    newPassword: z.string().optional(),
    confirmNewPassword: z.string().optional(),
  })
  .refine(
    (data) => !data.newPassword || data.newPassword === data.confirmNewPassword,
    {
      message: 'New passwords did not match',
      path: ['confirmNewPassword'],
    },
  )

const passwordSchema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    confirmPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters long'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export function UpdateUserForm() {
  const { authState } = useAuth()
  const [commitDeleteUser, isDeleteInFlight] = useMutation(DeleteUserMutation)
  const [commitUpdateUser, isUpdateInFlight] = useMutation(UpdateUserMutation)

  const data: any = useLazyLoadQuery(AccountWithBalance, {
    taxId: authState?.user?.taxId,
  })

  const account = data.accountWithUpdatedBalance.edges[0]?.node

  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: authState.user?.firstName || '',
      lastName: authState.user?.lastName || '',
      taxId: authState.user?.taxId || '',
      password: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  })

  const [errorMessage, setErrorMessage] = useState('')
  const [showDialog, setShowDialog] = useState(false)
  const [alertType, setAlertType] = useState<'error' | 'warning' | 'info'>(
    'info',
  )

  async function handleSubmit(values: z.infer<typeof profileSchema>) {
    const { firstName, lastName, password, newPassword } = values

    const variables = {
      input: {
        firstName,
        lastName,
        password,
        newPassword: newPassword || undefined,
      },
    }

    commitUpdateUser({
      variables,
      onCompleted: (_response, errors) => {
        if (errors) {
          setErrorMessage(errors[0].message)
          setAlertType('warning')
          setShowDialog(true)
        } else {
          setErrorMessage('Profile updated successfully')
          setAlertType('info')
          setShowDialog(true)
        }
      },
      onError: (err) => {
        setErrorMessage(err.message)
        setAlertType('error')
        setShowDialog(true)
      },
    })
  }

  async function handleDelete(_values: z.infer<typeof passwordSchema>) {
    commitDeleteUser({
      variables: {
        input: {
          taxId: form.getValues('taxId'),
        },
      },
      onCompleted: (response?: any, errors?: any) => {
        if (errors) {
          setErrorMessage(errors[0].message)
          setAlertType('warning')
          setShowDialog(true)
        } else {
          setErrorMessage(response.deletedUser.message)
          setAlertType('info')
          setShowDialog(true)
        }
      },
      onError: (err) => {
        setErrorMessage(err.message)
        setAlertType('error')
        setShowDialog(true)
      },
    })
  }

  const handleDeleteClick = async () => {
    handleDelete({
      password: '',
      confirmPassword: '',
    })
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="w-full">
          <CardHeader className="text-2xl font-bold mb-4">
            User Profile
          </CardHeader>
          <CardContent>
            <p>
              <strong>First Name:</strong> {form.getValues('firstName')}
            </p>
            <p>
              <strong>Last Name:</strong> {form.getValues('lastName')}
            </p>
            <p>
              <strong>Tax ID:</strong> {form.getValues('taxId')}
            </p>
            <p>
              <strong>Account Number:</strong> {account?.accountNumber}
            </p>
            <p>
              <strong>Balance: $</strong> {account?.balance}
            </p>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader className="text-2xl font-bold mb-4">
            Edit Profile
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="First Name" {...field} />
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
                        <Input placeholder="Last Name" {...field} />
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
                        <Input
                          type="password"
                          placeholder="Current Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="New Password (optional)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmNewPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Confirm New Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex space-x-4">
                  <Button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    disabled={isUpdateInFlight}
                  >
                    {isUpdateInFlight ? 'Saving...' : 'Save Changes'}
                  </Button>
                  <Button
                    onClick={handleDeleteClick}
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                    disabled={isDeleteInFlight}
                  >
                    {isDeleteInFlight ? 'Deleting...' : 'Delete Profile'}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      {showDialog && (
        <CustomAlertDialog
          open={showDialog}
          type={alertType}
          onClose={() => setShowDialog(false)}
          message={errorMessage}
        />
      )}
    </div>
  )
}

export default UpdateUserForm
