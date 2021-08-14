import bcrypt from 'bcrypt'
import { generateJwt } from '../../jwt/jwt'
import { LevelUserModel } from '../../model/user'
import { levelDatabase } from './database'
import { getFullUserDTOFromLevelUser } from './insert'

export const levelDbLogin = async (email: string, password: string) => {
  const users: LevelUserModel[] = await levelDatabase.get('users')
  const user = users.find((el) => el.email === email)
  if (!user) {
    throw new Error('Not found user.')
  }
  const result = await bcrypt.compare(password, user.password)
  if (result) {
    return {
      token: generateJwt(user.id),
      user: getFullUserDTOFromLevelUser(user),
    }
  }
  throw new Error('Invalid authentication.')
}
