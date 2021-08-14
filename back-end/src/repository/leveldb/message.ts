import {
  LevelMessage,
  LevelNotification,
  LevelUserModel,
  UserDTO,
} from '../../model/user'
import httpContext from 'express-http-context'
import { levelDatabase } from './database'
import { canInteract, getUserDTOFromUser } from '../mongodb/util'
import { generateRandomId } from './insert'

export const sendMessageLevel = async (
  userId: string,
  content: string
): Promise<UserDTO> => {
  const loggedUserContext = httpContext.get('loggedUser')
  const users: LevelUserModel[] = await levelDatabase.get('users')
  const user = users.find((el) => el.id === userId)
  const loggedUser = users.find(
    (el) => el.id === loggedUserContext.id
  ) as LevelUserModel
  if (!user) {
    throw new Error('Not found user')
  }

  if (!canInteract(loggedUser, user)) {
    throw new Error('Blocked user.')
  }

  const message: LevelMessage = {
    id: generateRandomId(),
    receiver: userId,
    sender: loggedUser.id,
    sentAt: new Date(),
    content: content,
  }
  loggedUser.messages.push(message)
  user.messages.push(message)

  const notification: LevelNotification = {
    id: generateRandomId(),
    user: loggedUser.id,
    content: `${loggedUser.name} sent you a message!`,
    moment: new Date(),
  }

  user.notifications.push(notification)
  httpContext.set('loggedUser', loggedUser)
  await levelDatabase.put('users', users)
  return getUserDTOFromUser(user)
}
