import * as jwt from 'jsonwebtoken'
import { JwtPayload } from 'jsonwebtoken'

const secret =
  'rWkxDVn3nHx7Uuaxd5AHsAFOEKpZpBn4IFUS0txneMjOWGGqDUa7CMPUMOE733hp'

export const generateJwt = (id: string) => {
  return jwt.sign({ data: id }, secret, { expiresIn: '72h' })
}

export const validateJwt = (token: string): string => {
  const valid = jwt.verify(token, secret) as JwtPayload
  return valid.data
}
