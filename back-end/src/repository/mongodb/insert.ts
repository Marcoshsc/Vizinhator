import { User, UserDTO } from '../../model/user'
import { getUserDTOFromUser } from './util'
import bcrypt from 'bcrypt'

export const addUser = async (userDTO: UserDTO): Promise<UserDTO> => {
  if (!userDTO.password) {
    throw new Error('No password provided.')
  }
  const hashedPassword = await bcrypt.hash(userDTO.password, 10)
  const user = new User({
    position: userDTO.location,
    name: userDTO.name,
    cellphone: {
      ...userDTO.cellphone,
    },
    password: hashedPassword,
    email: userDTO.email,
    occupation: {
      ...userDTO.occupation,
    },
    available: {
      ...userDTO.available,
    },
    avatarUrl: {
      ...userDTO.avatarUrl,
    },
    description: {
      ...userDTO.description,
    },
    since: new Date(),
    closeFriendsIds: [],
    likedBy: [],
    dislikedBy: [],
    messages: [],
  })
  const savedUser = await user.save()
  return getUserDTOFromUser(savedUser)
}

export const getUser = async (id: string): Promise<UserDTO> => {
  const foundUser = await User.findById(id)
  return getUserDTOFromUser(foundUser)
}

export const editUser = async (id: string, userDTO: UserDTO) => {
  const dbUser = await User.findById(id)
  dbUser.position.coordinates = userDTO.location.coordinates
  dbUser.name = userDTO.name
  dbUser.cellphone = { ...userDTO.cellphone }
  dbUser.occupation = { ...userDTO.occupation }
  dbUser.available = { ...userDTO.available }
  dbUser.avatarUrl = { ...userDTO.avatarUrl }
  dbUser.description = { ...userDTO.description }
  const savedUser = await dbUser.save()
  return getUserDTOFromUser(savedUser)
}
