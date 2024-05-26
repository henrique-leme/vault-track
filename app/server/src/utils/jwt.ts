import { config } from '@/config'
import jwt from 'jsonwebtoken'
import { TokenError } from './tokenError'
import { findAccountByTaxId } from 'src/services/accountServices'

export async function generateJwt(taxId: string) {
  const { _id } = await findAccountByTaxId(taxId)

  const payload = {
    taxId,
    uniqueId: _id,
  }
  const jwtToken = jwt.sign(payload, config.JWT_KEY, { expiresIn: '30min' })

  return jwtToken
}

export async function jwtValidation(jwtToken: string) {
  try {
    const decoded = jwt.verify(jwtToken, config.JWT_KEY)

    return decoded
  } catch (error) {
    throw new TokenError({
      name: 'InvalidToken',
      message: 'Invalid token provided',
    })
  }
}
