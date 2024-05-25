import { config } from '@/config'
import jwt from 'jsonwebtoken'

export async function generateJwt(taxId: string) {
  const payload = {
    taxId,
  }
  const jwtToken = jwt.sign(payload, config.JWT_KEY, { expiresIn: '30min' })

  return jwtToken
}
