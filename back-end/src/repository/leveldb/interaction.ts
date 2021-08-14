import { LevelNotification, LevelUserModel, UserDTO } from '../../model/user'
import httpContext from 'express-http-context'
import { levelDatabase } from './database'
import { canInteractLevel } from './util'
import { generateRandomId, getUserDTOFromLevelUser } from './insert'

export const likeOrDislikeUserLevel = async (
  userId: string,
  like: boolean
): Promise<UserDTO> => {
  const loggedUser = httpContext.get('loggedUser')
  const loggedUserId = loggedUser.id
  const users: LevelUserModel[] = await levelDatabase.get('users')
  const user = users.find((el) => el.id === userId)
  if (!user) {
    throw new Error('Not found user.')
  }
  const arrayToBeUsed = like ? user.likedBy : user.dislikedBy

  if (!canInteractLevel(loggedUser, user)) {
    throw new Error('Blocked user.')
  }

  const index = user.likedBy.indexOf(loggedUserId)
  let content = ''
  if (index === -1) {
    arrayToBeUsed.push(loggedUserId)
  } else {
    arrayToBeUsed.splice(index, 1)
    content = 'no longer'
  }
  const notification: LevelNotification = {
    id: generateRandomId(),
    user: loggedUser.id,
    content: `${loggedUser.name} ${content} ${
      like ? `likes` : `dislikes`
    } you!`,
    moment: new Date(),
  }
  user.notifications.push(notification)
  await levelDatabase.put('users', users)
  return getUserDTOFromLevelUser(user)
}

export const closeFriendLevel = async (userId: string): Promise<UserDTO> => {
  const loggedUserContext = httpContext.get('loggedUser')

  const users: LevelUserModel[] = await levelDatabase.get('users')
  const user = users.find((el) => el.id === userId)
  const loggedUser = users.find(
    (el) => el.id === loggedUserContext.id
  ) as LevelUserModel
  if (!user) {
    throw new Error('Not found user.')
  }
  const userIdDatabase = user.id

  if (!canInteractLevel(loggedUser, user)) {
    throw new Error('Blocked user.')
  }

  if (loggedUser.closeFriendsIds.includes(userIdDatabase)) {
    return getUserDTOFromLevelUser(user)
  }
  loggedUser.closeFriendsIds.push(userIdDatabase)
  const notification: LevelNotification = {
    id: generateRandomId(),
    user: loggedUser.id,
    content: `${loggedUser.name} wanna be your close friend!`,
    moment: new Date(),
  }
  user.notifications.push(notification)
  await levelDatabase.put('users', users)
  httpContext.set('loggedUser', loggedUser)
  return getUserDTOFromLevelUser(user)
}

export const blockUserLevel = async (userId: string): Promise<void> => {
  const loggedUserContext = httpContext.get('loggedUser')

  const users: LevelUserModel[] = await levelDatabase.get('users')
  const loggedUser = users.find(
    (el) => el.id === loggedUserContext.id
  ) as LevelUserModel

  const index = loggedUser.blockedUsers.indexOf(userId)
  if (index === -1) {
    loggedUser.blockedUsers.push(userId)
    loggedUser.notifications = loggedUser.notifications.filter(
      (el) => el.user !== userId
    )
  } else {
    loggedUser.blockedUsers.splice(index, 1)
  }

  await levelDatabase.put('users', users)
  httpContext.set('loggedUser', loggedUser)
}

export const getBlockedUsersLevel = async (): Promise<
  { id: string; name: string }[]
> => {
  const loggedUser = httpContext.get('loggedUser')
  const users = (await levelDatabase.get('users')).filter((el) =>
    loggedUser.blockedUsers.includes(el.id)
  )
  return users.map((el) => ({
    id: el.id,
    name: el.name,
  }))
}
