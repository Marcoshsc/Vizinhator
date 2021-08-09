import httpContext from 'express-http-context'
import { User } from '../../model/user'

export const likeOrDislikeUser = async (
  userId: string,
  like: boolean
): Promise<void> => {
  const loggedUser = httpContext.get('loggedUser')
  const loggedUserId = loggedUser._id.toString()
  const user = await User.findById(userId)
  const arrayToBeUsed = like ? user.likedBy : user.dislikedBy

  const index = user.likedBy.indexOf(loggedUserId)
  if (index === -1) {
    arrayToBeUsed.push(loggedUserId)
  } else {
    arrayToBeUsed.splice(index, 1)
  }
  await user.save()
}

export const closeFriend = async (userId: string): Promise<void> => {
  const loggedUser = httpContext.get('loggedUser')
  const loggedUserId = loggedUser._id.toString()
  const user = await User.findById(userId)
  if (user.closeFriendsIds.includes(loggedUserId)) {
    return
  }
  user.closeFriendsIds.push(loggedUserId)
  await user.save()
}
