import userModel from '../../src/models/user.model'
import { createAccount } from '../../src/services/accountServices'
import {
  hashPassword,
  validatePassword,
} from '../../src/utils/encryptedPassword'
import { RegisterUserData } from '@/modules/user/mutations/registerUserMutation'
import { UserError } from '../../src/utils/userError'
import { UpdateUserData } from '@/modules/user/mutations/updateUserMutation'

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

export async function validateUserAndPassword(taxId: string, password: string) {
  const existingUser = await findUser(taxId)

  if (existingUser) {
    await validatePassword(password, existingUser.password)

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
  const user = await userModel.create({
    firstName: data.firstName,
    lastName: data.lastName ?? '',
    taxId: data.taxId,
    password: data.password,
  })

  return user
}

export const findUser = async (taxId: string) => {
  const user = await userModel.findOne({
    taxId: taxId,
  })

  if (user) {
    return user
  }

  return false
}

export async function deleteUserByTaxId(taxId: string) {
  await userModel.deleteOne({ taxId: taxId })

  return true
}

export async function updateUser(taxId: string, data: UpdateUserData) {
  const { firstName, lastName, newPassword } = data

  const newUserInformation: any = {}

  if (firstName) newUserInformation.firstName = firstName
  if (lastName) newUserInformation.lastName = lastName

  if (newPassword) {
    newUserInformation.password = await hashPassword(newPassword)
  }

  const updatedUser = await userModel.findOneAndUpdate(
    { taxId: taxId },
    { ...newUserInformation },
    { new: true },
  )

  return updatedUser
}
