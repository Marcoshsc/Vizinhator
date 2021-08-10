import { NotificationDTO } from '../../model/user'
import httpContext from 'express-http-context'
import { getNotificationDTOFromNotification } from './util'

export const getNotifications = async (): Promise<NotificationDTO[]> => {
  const loggedUser = httpContext.get('loggedUser')
  return loggedUser.notifications.map(getNotificationDTOFromNotification)
}

export const readNotification = async (id: string) => {
  const loggedUser = httpContext.get('loggedUser')
  loggedUser.notifications = loggedUser.notifications.filter(
    (el) => el._id.toString() !== id
  )
  const savedUser = await loggedUser.save()
  httpContext.set('loggedUser', savedUser)
  return savedUser.notifications.map(getNotificationDTOFromNotification)
}
