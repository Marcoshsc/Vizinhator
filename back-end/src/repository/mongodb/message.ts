import httpContext from 'express-http-context'
import { Message, User } from '../../model/user'

export const sendMessage = async (
  userId: string,
  content: string
): Promise<void> => {
  const loggedUser = httpContext.get('loggedUser')
  const user = await User.findById(userId)
  const message = new Message({
    receiverId: userId,
    senderId: loggedUser._id,
    sentAt: new Date(),
    content: content,
  })
  user.messages.push(message)
  await user.save()
}
