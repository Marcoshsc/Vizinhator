import { User, UserDTO } from '../../model/user'
import { getUserDTOFromUser } from './util'
import bcrypt from 'bcrypt'
import { generateFullUserDTO } from './auth'
import httpContext from 'express-http-context'

const getNearUsers = async (savedUser: any) => {
  return await User.find({
    _id: {
      $ne: savedUser._id,
    },
    position: {
      $near: {
        $geometry: savedUser.position,
        $maxDistance: 400,
      },
    },
  })
}

const notifyNearUsers = async (savedUser: any, notification: any) => {
  const nearUsers = await getNearUsers(savedUser)
  nearUsers.forEach(async (user) => {
    user.notifications.push(notification)
    await user.save()
  })
}

export const addUser = async (userDTO: UserDTO): Promise<UserDTO> => {
  if (!userDTO.password || !userDTO.email) {
    throw new Error('No password or email provided.')
  }
  const alreadyExists = await User.findOne({ email: userDTO.email })
  if (alreadyExists) {
    throw new Error('User already exists.')
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

  const notification = {
    user: savedUser._id,
    content: `You have a new neighbour: ${user.name}!`,
    moment: new Date(),
  }
  notifyNearUsers(savedUser, notification)

  return generateFullUserDTO(savedUser)
}

export const getUser = async (id: string): Promise<UserDTO> => {
  const foundUser = await User.findById(id)
  return getUserDTOFromUser(foundUser)
}

export const editUser = async (userDTO: UserDTO) => {
  const loggedUser = httpContext.get('loggedUser')
  const dbUser = await User.findById(loggedUser._id)
  const previousLocation = dbUser.position.coordinates
  const newLocation = userDTO.location.coordinates
  dbUser.position.coordinates = userDTO.location.coordinates
  dbUser.name = userDTO.name
  dbUser.cellphone = { ...userDTO.cellphone }
  dbUser.occupation = { ...userDTO.occupation }
  dbUser.available = { ...userDTO.available }
  dbUser.avatarUrl = { ...userDTO.avatarUrl }
  dbUser.description = { ...userDTO.description }
  const savedUser = await dbUser.save()
  if (
    previousLocation[0] !== newLocation[0] ||
    previousLocation[1] !== newLocation[1]
  ) {
    const notification = {
      user: savedUser._id,
      content: `You have a new neighbour: ${savedUser.name}!`,
      moment: new Date(),
    }
    notifyNearUsers(savedUser, notification)
  }
  return generateFullUserDTO(savedUser)
}
