import {
  LevelMessage,
  LevelNotification,
  LevelUserModel,
  MessageDTO,
  NotificationDTO,
} from '../../model/user'

export const generateMessageDTOFromLevelMessage = (
  message: LevelMessage
): MessageDTO => {
  return {
    content: message.content,
    sentAt: message.sentAt,
    sender: message.sender,
    receiver: message.receiver,
  }
}

export const getNotificationDTOFromLevelNotification = (
  notification: LevelNotification
): NotificationDTO => {
  return {
    id: `${notification.id}`,
    content: notification.content,
    user: notification.user,
    moment: notification.moment,
  }
}

export const canInteractLevel = (
  user1: LevelUserModel,
  user2: LevelUserModel
) => {
  return (
    !user1.blockedUsers.includes(user2.id) &&
    !user2.blockedUsers.includes(user1.id)
  )
}

export function calcCrow(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  var R = 6371 // km
  var dLat = toRad(lat2 - lat1)
  var dLon = toRad(lon2 - lon1)
  var lat1 = toRad(lat1)
  var lat2 = toRad(lat2)

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2)
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  var d = R * c
  return d * 1000
}

// Converts numeric degrees to radians
function toRad(Value) {
  return (Value * Math.PI) / 180
}
