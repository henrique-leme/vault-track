import userModel, { UserModel } from 'src/models/user.model'
import { createAccount } from './accountServices'
import { hashPassword } from 'src/utils/encryptedPassword'

export async function validateExistingUser(email: string, taxId: string) {
  const existingUser = await userModel.findOne({
    $or: [{ email }, { taxId }],
  })

  if (existingUser) {
    throw new Error('User, email, or tax ID (cpf/cnpj) already exists')
  }

  return false
}

export async function createUser(data: UserModel) {
  data.password = await hashPassword(data.password)

  const user = await newUser(data)

  await createAccount(user.id)
}

const newUser = async (data: UserModel) => {
  const user = new userModel({
    firstName: data.firstName,
    lastName: data.lastname ?? '',
    taxId: data.taxId,
    email: data.email,
    password: data.password,
  })

  return user
}

export const findUser = async (taxId: string) => {
  const user = await userModel.findOne({
    $match: { taxId: taxId },
  })

  if (user) {
    return user
  }

  throw new Error('User not found')
}
