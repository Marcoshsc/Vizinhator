import { LevelNotification, LevelUserModel, UserDTO } from '../../model/user'
import { levelDatabase } from './database'
import httpContext from 'express-http-context'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import { calcCrow, generateMessageDTOFromLevelMessage } from './util'

export const getUserDTOFromLevelUser = (savedUser: LevelUserModel): UserDTO => {
  const loggedUser = httpContext.get('loggedUser')
  const loggedUserId = loggedUser.id
  const savedWantsCloseFriend = savedUser.closeFriendsIds.includes(loggedUserId)
  const loggedUserWantsCloseFriend = loggedUser.closeFriendsIds.includes(
    savedUser.id
  )
  const closeFriends = savedWantsCloseFriend && loggedUserWantsCloseFriend
  return {
    id: savedUser.id,
    password: undefined,
    email: undefined,
    avatarUrl: {
      value:
        savedUser.avatarUrl.hide && !closeFriends
          ? undefined
          : savedUser.avatarUrl.value,
      hide: savedUser.avatarUrl.hide,
    },
    cellphone: {
      value:
        savedUser.cellphone.hide && !closeFriends
          ? undefined
          : savedUser.cellphone.value,
      hide: savedUser.cellphone.hide,
    },
    occupation: {
      value:
        savedUser.occupation.hide && !closeFriends
          ? undefined
          : savedUser.occupation.value,
      hide: savedUser.occupation.hide,
    },
    available: {
      value:
        savedUser.available.hide && !closeFriends
          ? undefined
          : savedUser.available.value,
      hide: savedUser.available.hide,
    },
    description: {
      value:
        savedUser.description.hide && !closeFriends
          ? undefined
          : savedUser.description.value,
      hide: savedUser.description.hide,
    },
    closeFriend:
      savedWantsCloseFriend && loggedUserWantsCloseFriend
        ? 'yes'
        : savedWantsCloseFriend
        ? 'he-requested'
        : loggedUserWantsCloseFriend
        ? 'you-requested'
        : 'no',
    since: savedUser.since,
    likes: savedUser.likedBy.length,
    dislikes: savedUser.dislikedBy.length,
    liked: savedUser.likedBy.includes(loggedUserId),
    disliked: savedUser.dislikedBy.includes(loggedUserId),
    messages: savedUser.messages
      .filter(
        (el) => el.sender === loggedUserId || el.receiver === loggedUserId
      )
      .map(generateMessageDTOFromLevelMessage),
    location: {
      type: 'Point',
      coordinates: savedUser.position,
    },
    name: savedUser.name,
  }
}

export const getFullUserDTOFromLevelUser = (user: LevelUserModel): UserDTO => {
  return {
    id: user.id,
    available: { ...user.available },
    avatarUrl: { ...user.avatarUrl },
    cellphone: { ...user.cellphone },
    description: { ...user.description },
    occupation: { ...user.occupation },
    location: {
      type: 'Point',
      coordinates: user.position,
    },
    name: user.name,
    closeFriend: 'no',
    disliked: false,
    liked: false,
    dislikes: user.dislikedBy.length,
    likes: user.likedBy.length,
    email: user.email,
    password: undefined,
    messages: user.messages,
    since: user.since,
  }
}

export const generateRandomId = () => {
  return crypto.randomBytes(50).toString('hex')
}

export const levelDbEditUser = async (userDTO: UserDTO) => {
  const loggedUser: LevelUserModel = httpContext.get('loggedUser')
  const users = await levelDatabase.get('users')
  const dbUser = users.find((el) => el.id === loggedUser.id)
  dbUser.position = userDTO.location.coordinates
  dbUser.name = userDTO.name
  dbUser.cellphone = { ...userDTO.cellphone }
  dbUser.occupation = { ...userDTO.occupation }
  dbUser.available = { ...userDTO.available }
  dbUser.avatarUrl = { ...userDTO.avatarUrl }
  dbUser.description = { ...userDTO.description }
  await levelDatabase.put('users', users)
  return getFullUserDTOFromLevelUser(dbUser)
}

export const levelDbGetUser = async (id: string) => {
  const users = await levelDatabase.get('users')
  const user = users.find((el) => el.id === id)
  if (!user) {
    throw new Error('Not found user.')
  }
  return getUserDTOFromLevelUser(user)
}

export const getNearUsers = (user: LevelUserModel, users: LevelUserModel[]) => {
  return users.filter(
    (el) =>
      el.id !== user.id &&
      calcCrow(
        user.position[0],
        user.position[1],
        el.position[0],
        el.position[1]
      ) <= 500
  )
}

const notifyNearUsers = (
  savedUser: LevelUserModel,
  users: LevelUserModel[],
  notification: LevelNotification
) => {
  const nearUsers = getNearUsers(savedUser, users)
  nearUsers.forEach((user) => {
    user.notifications.push(notification)
  })
}

export const levelDbInsertUser = async (user: UserDTO) => {
  const users = await levelDatabase.get('users')
  if (!user.email || !user.password) {
    throw new Error('Provide email and password to insert.')
  }
  const findUser = users.find((el) => el.email === user.email)
  if (findUser) {
    throw new Error('User already exists.')
  }
  const hashedPassword = await bcrypt.hash(user.password, 10)
  const userToSave: LevelUserModel = {
    id: generateRandomId(),
    available: { ...user.available },
    avatarUrl: { ...user.avatarUrl },
    cellphone: { ...user.cellphone },
    description: { ...user.description },
    occupation: { ...user.occupation },
    blockedUsers: [],
    closeFriendsIds: [],
    dislikedBy: [],
    email: user.email,
    likedBy: [],
    messages: [],
    name: user.name,
    notifications: [],
    password: hashedPassword,
    position: user.location.coordinates,
    since: new Date(),
  }
  const notification = {
    id: generateRandomId(),
    user: userToSave.id,
    content: `You have a new neighbour: ${user.name}!`,
    moment: new Date(),
  }
  notifyNearUsers(userToSave, users, notification)
  users.push(userToSave)
  await levelDatabase.put('users', users)
  return getFullUserDTOFromLevelUser(userToSave)
}
