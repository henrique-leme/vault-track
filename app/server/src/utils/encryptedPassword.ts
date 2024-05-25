import * as bcrypt from 'bcrypt'
import { UserError } from './userError'

export async function hashPassword(password: string): Promise<string> {
  const hashedPassword = await bcrypt.hash(password, 10)

  return hashedPassword
}

export async function validatePassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  const validPassword = await bcrypt.compare(password, hashedPassword)

  if (validPassword) {
    return true
  }
  throw new UserError({
    name: 'AutenticationFailed',
    message: 'Invalid password',
  })
}
