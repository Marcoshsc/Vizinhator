import { LevelUserModel, NotificationDTO } from '../../model/user'
import httpContext from 'express-http-context'
import { getNotificationDTOFromLevelNotification } from './util'
import { levelDatabase } from './database'

export const getNotificationsLevel = async (): Promise<NotificationDTO[]> => {
  const loggedUser = httpContext.get('loggedUser')
  return loggedUser.notifications.map(getNotificationDTOFromLevelNotification)
}

export const readNotificationLevel = async (id: string) => {
  const loggedUserContext = httpContext.get('loggedUser')

  const users = await levelDatabase.get('users')
  const loggedUser = users.find(
    (el) => el.id === loggedUserContext.id
  ) as LevelUserModel

  loggedUser.notifications = loggedUser.notifications.filter(
    (el) => el.id.toString() !== id
  )

  await levelDatabase.put('users', users)
  httpContext.set('loggedUser', loggedUser)
  return loggedUser.notifications.map(getNotificationDTOFromLevelNotification)
}
