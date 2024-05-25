import UserModel from 'src/models/user.model'
import { createAccount } from './accountServices'
import { hashPassword } from 'src/utils/encryptedPassword'
import { RegisterUserData } from '@/modules/user/mutations/registerUserMutation'
import { UserError } from 'src/utils/userError'

export async function validateExistingUser(taxId: string) {
  const existingUser = await UserModel.findOne({
    taxId: taxId,
  })

  if (existingUser) {
    if (existingUser) {
      throw new UserError({
        name: 'UserAlreadyExistis',
        message: 'There is already a user with this taxId.',
      })
    }
  }

  return false
}

export async function createUser(data: RegisterUserData) {
  data.password = await hashPassword(data.password)

  const user = await newUser(data)

  user.id = user._id

  await createAccount(user.id)

  return user
}

const newUser = async (data: RegisterUserData) => {
  const user = await UserModel.create({
    firstName: data.firstName,
    lastName: data.lastName ?? '',
    taxId: data.taxId,
    password: data.password,
  })

  return user
}

export const findUser = async (taxId: string) => {
  const user = await UserModel.findOne({
    $match: { taxId: taxId },
  })

  if (user) {
    return user
  }

  throw new UserError({
    name: 'UserNotFound',
    message: 'There is no user with this taxId.',
  })
}
