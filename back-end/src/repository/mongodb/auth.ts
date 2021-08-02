import { User } from '../../model/user'
import bcrypt from 'bcrypt'
import { generateJwt } from '../../jwt/jwt'

export const authenticate = async (
  email: string,
  password: string
): Promise<string> => {
  const user = await User.findOne({ email: email })
  if (!user) {
    throw new Error('Not found user')
  }
  // console.log(user)
  const result = await bcrypt.compare(password, user.password)
  if (result) {
    return generateJwt(user._id)
  }
  throw new Error('Invalid authentication.')
}
