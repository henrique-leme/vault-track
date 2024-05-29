import UserModel from 'src/models/user.model'
import { createAccount } from './accountServices'
import { hashPassword, validatePassword } from 'src/utils/encryptedPassword'
import { RegisterUserData } from '@/modules/user/mutations/registerUserMutation'
import { UserError } from 'src/utils/userError'
import { LoginUserData } from '@/modules/user/mutations/loginUserMutation'

export async function validateExistingUser(taxId: string) {
  const existingUser = await findUser(taxId)

  if (existingUser) {
    throw new UserError({
      name: 'UserAlreadyExistis',
      message: 'There is already a user with this taxId.',
    })
  }

  return false
}

export async function validateUserExists(taxId: string) {
  const existingUser = await findUser(taxId)

  if (existingUser) {
    return true
  }

  throw new UserError({
    name: 'UserNotFound',
    message: 'There is no user with this taxId.',
  })
}

export async function validateUserLogin(data: LoginUserData) {
  const existingUser = await findUser(data.taxId)

  if (existingUser) {
    await validatePassword(data.password, existingUser.password)

    return existingUser
  }
  throw new UserError({
    name: 'UserNotFound',
    message: 'There is no user with this taxId.',
  })
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
    taxId: taxId,
  })

  if (user) {
    return user
  }

  return false
}

export async function deleteUserByTaxId(taxId: string) {
  await UserModel.deleteOne({ taxId: taxId })

  return true
}
