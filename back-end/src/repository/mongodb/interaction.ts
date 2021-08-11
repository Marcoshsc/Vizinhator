import httpContext from 'express-http-context'
import { User, UserDTO } from '../../model/user'
import { canInteract, getUserDTOFromUser } from './util'

export const likeOrDislikeUser = async (
  userId: string,
  like: boolean
): Promise<UserDTO> => {
  const loggedUser = httpContext.get('loggedUser')
  const loggedUserId = loggedUser._id.toString()
  const user = await User.findById(userId)
  const arrayToBeUsed = like ? user.likedBy : user.dislikedBy

  if (!canInteract(loggedUser, user)) {
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
  const notification = {
    user: loggedUser._id,
    content: `${loggedUser.name} ${content} ${
      like ? `likes` : `dislikes`
    } you!`,
    moment: new Date(),
  }
  user.notifications.push(notification)
  const savedUser = await user.save()
  return getUserDTOFromUser(savedUser)
}

export const closeFriend = async (userId: string): Promise<UserDTO> => {
  const loggedUser = httpContext.get('loggedUser')
  const user = await User.findById(userId)
  const userIdDatabase = user._id.toString()

  if (!canInteract(loggedUser, user)) {
    throw new Error('Blocked user.')
  }

  if (loggedUser.closeFriendsIds.includes(userIdDatabase)) {
    return getUserDTOFromUser(user)
  }
  loggedUser.closeFriendsIds.push(userIdDatabase)
  const notification = {
    user: loggedUser._id,
    content: `${loggedUser.name} wanna be your close friend!`,
    moment: new Date(),
  }
  user.notifications.push(notification)
  await user.save()
  const savedUser = await loggedUser.save()
  httpContext.set('loggedUser', savedUser)
  return getUserDTOFromUser(user)
}

export const blockUser = async (userId: string): Promise<void> => {
  const loggedUser = httpContext.get('loggedUser')
  const index = loggedUser.blockedUsers.indexOf(userId)
  if (index === -1) {
    loggedUser.blockedUsers.push(userId)
    loggedUser.notifications = loggedUser.notifications.filter(
      (el) => el.user !== userId
    )
  } else {
    loggedUser.blockedUsers.splice(index, 1)
  }
  const savedUser = await loggedUser.save()
  httpContext.set('loggedUser', savedUser)
}

export const getBlockedUsers = async (): Promise<
  { id: string; name: string }[]
> => {
  const loggedUser = httpContext.get('loggedUser')
  const users = await User.find({
    _id: {
      $in: loggedUser.blockedUsers,
    },
  })
  return users.map((el) => ({
    id: el._id,
    name: el.name,
  }))
}
