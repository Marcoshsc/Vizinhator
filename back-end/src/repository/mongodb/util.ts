import { MessageDTO, User, UserDTO } from '../../model/user'
import httpContext from 'express-http-context'

export const generateMessageDTOFromMessage = (message: any): MessageDTO => {
  return {
    content: message.content,
    sentAt: message.sentAt,
    sender: message.senderId,
    receiver: message.receiverId,
  }
}

export const getUserDTOFromUser = (savedUser: any): UserDTO => {
  const loggedUser = httpContext.get('loggedUser')
  const loggedUserId = loggedUser._id.toString()
  const savedWantsCloseFriend = savedUser.closeFriendsIds.includes(loggedUserId)
  const loggedUserWantsCloseFriend = loggedUser.closeFriendsIds.includes(
    savedUser._id.toString()
  )
  console.log(`${savedWantsCloseFriend} - ${loggedUserWantsCloseFriend}`)
  const closeFriends = savedWantsCloseFriend && loggedUserWantsCloseFriend
  return {
    id: savedUser._id,
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
        (el) => el.senderId === loggedUserId || el.receiverId === loggedUserId
      )
      .map(generateMessageDTOFromMessage),
    location: savedUser.position,
    name: savedUser.name,
  }
}
