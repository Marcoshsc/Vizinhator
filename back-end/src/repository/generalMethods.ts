import { databaseParameters } from '../env/database'
import { NotificationDTO, UserDTO } from '../model/user'
import { authenticate } from './mongodb/auth'
import {
  addUser as mongoDBAddUser,
  getUser as mongoDBGetUser,
  editUser as mongoDBEditUser,
} from './mongodb/insert'
import {
  blockUser,
  closeFriend,
  getBlockedUsers,
  likeOrDislikeUser,
} from './mongodb/interaction'
import { sendMessage } from './mongodb/message'
import { getNotifications, readNotification } from './mongodb/notification'
import { searchNearUsers } from './mongodb/search'
import {
  levelDbEditUser,
  levelDbGetUser,
  levelDbInsertUser,
} from './leveldb/insert'
import { levelDbLogin } from './leveldb/auth'
import { sendMessageLevel } from './leveldb/message'
import {
  blockUserLevel,
  closeFriendLevel,
  getBlockedUsersLevel,
  likeOrDislikeUserLevel,
} from './leveldb/interaction'
import { searchNearUsersLevel } from './leveldb/search'
import {
  getNotificationsLevel,
  readNotificationLevel,
} from './leveldb/notification'

export interface AuthResponse {
  token: string
  user: UserDTO
}

export const addUser = async (userDTO: UserDTO): Promise<UserDTO> => {
  return databaseParameters.db === 'mongo'
    ? mongoDBAddUser(userDTO)
    : levelDbInsertUser(userDTO)
}

export const editUser = async (userDTO: UserDTO): Promise<UserDTO> => {
  return databaseParameters.db === 'mongo'
    ? await mongoDBEditUser(userDTO)
    : await levelDbEditUser(userDTO)
}

export const getUser = async (id: string): Promise<UserDTO> => {
  return databaseParameters.db === 'mongo'
    ? mongoDBGetUser(id)
    : levelDbGetUser(id)
}

export const authenticateUser = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  return databaseParameters.db === 'mongo'
    ? await authenticate(email, password)
    : await levelDbLogin(email, password)
}

export const sendMessageToUser = async (user: string, content: string) => {
  return databaseParameters.db === 'mongo'
    ? sendMessage(user, content)
    : sendMessageLevel(user, content)
}

export const likeUser = async (user: string): Promise<UserDTO> => {
  return databaseParameters.db === 'mongo'
    ? likeOrDislikeUser(user, true)
    : likeOrDislikeUserLevel(user, true)
}

export const dislikeUser = async (user: string): Promise<UserDTO> => {
  return databaseParameters.db === 'mongo'
    ? likeOrDislikeUser(user, false)
    : likeOrDislikeUserLevel(user, false)
}

export const closeFriendUser = async (user: string): Promise<UserDTO> => {
  return databaseParameters.db === 'mongo'
    ? closeFriend(user)
    : closeFriendLevel(user)
}

export const getNearUsers = async (): Promise<UserDTO[]> => {
  return databaseParameters.db === 'mongo'
    ? searchNearUsers()
    : searchNearUsersLevel()
}

export const getUserNotifications = async (): Promise<NotificationDTO[]> => {
  return databaseParameters.db === 'mongo'
    ? getNotifications()
    : getNotificationsLevel()
}

export const readUserNotification = async (id: string) => {
  return databaseParameters.db === 'mongo'
    ? readNotification(id)
    : readNotificationLevel(id)
}

export const blockGivenUser = async (userId: string) => {
  return databaseParameters.db === 'mongo'
    ? blockUser(userId)
    : blockUserLevel(userId)
}

export const getLoggedBlockedUsers = async () => {
  return databaseParameters.db === 'mongo'
    ? getBlockedUsers()
    : getBlockedUsersLevel()
}
