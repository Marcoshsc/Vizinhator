import httpContext from 'express-http-context'
import { Message, User, UserDTO } from '../../model/user'
import { canInteract, getUserDTOFromUser } from './util'

export const sendMessage = async (
  userId: string,
  content: string
): Promise<UserDTO> => {
  const loggedUser = httpContext.get('loggedUser')
  const user = await User.findById(userId)

  if (!canInteract(loggedUser, user)) {
    throw new Error('Blocked user.')
  }

  const message = new Message({
    receiverId: userId,
    senderId: loggedUser._id,
    sentAt: new Date(),
    content: content,
  })
  loggedUser.messages.push(message)
  user.messages.push(message)

  const notification = {
    user: loggedUser._id,
    content: `${loggedUser.name} sent you a message!`,
    moment: new Date(),
  }

  user.notifications.push(notification)
  const savedUser = await loggedUser.save()
  httpContext.set('loggedUser', savedUser)
  return getUserDTOFromUser(await user.save())
}
