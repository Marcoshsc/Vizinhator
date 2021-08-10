import { User, UserDTO } from '../../model/user'
import bcrypt from 'bcrypt'
import { generateJwt } from '../../jwt/jwt'
import { generateMessageDTOFromMessage, getUserDTOFromUser } from './util'

interface AuthResponse {
  token: string
  user: UserDTO
}

export const generateFullUserDTO = (savedUser: any) => {
  return {
    id: savedUser._id,
    password: undefined,
    email: savedUser.email,
    avatarUrl: {
      value: savedUser.avatarUrl.value,
      hide: savedUser.avatarUrl.hide,
    },
    cellphone: {
      value: savedUser.cellphone.value,
      hide: savedUser.cellphone.hide,
    },
    occupation: {
      value: savedUser.occupation.value,
      hide: savedUser.occupation.hide,
    },
    available: {
      value: savedUser.available.value,
      hide: savedUser.available.hide,
    },
    description: {
      value: savedUser.description.value,
      hide: savedUser.description.hide,
    },
    since: savedUser.since,
    likes: savedUser.likedBy.length,
    dislikes: savedUser.dislikedBy.length,
    messages: [],
    location: savedUser.position,
    name: savedUser.name,
  }
}

export const authenticate = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const user = await User.findOne({ email: email })
  if (!user) {
    throw new Error('Not found user')
  }
  const result = await bcrypt.compare(password, user.password)
  if (result) {
    return {
      token: generateJwt(user._id),
      user: generateFullUserDTO(user),
    }
  }
  throw new Error('Invalid authentication.')
}
