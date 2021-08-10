import { NotificationDTO, UserDTO } from '../model/user'
import { authenticate } from './mongodb/auth'
import {
  addUser as mongoDBAddUser,
  getUser as mongoDBGetUser,
  editUser as mongoDBEditUser,
} from './mongodb/insert'
import { closeFriend, likeOrDislikeUser } from './mongodb/interaction'
import { sendMessage } from './mongodb/message'
import { getNotifications, readNotification } from './mongodb/notification'
import { searchNearUsers } from './mongodb/search'

export interface AuthResponse {
  token: string
  user: UserDTO
}

export const addUser = async (userDTO: UserDTO): Promise<UserDTO> => {
  return mongoDBAddUser(userDTO)
}

export const editUser = async (userDTO: UserDTO): Promise<UserDTO> => {
  return mongoDBEditUser(userDTO)
}

export const getUser = async (id: string): Promise<UserDTO> => {
  return mongoDBGetUser(id)
}

export const authenticateUser = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  return await authenticate(email, password)
}

export const sendMessageToUser = async (user: string, content: string) => {
  return await sendMessage(user, content)
}

export const likeUser = async (user: string): Promise<UserDTO> => {
  return await likeOrDislikeUser(user, true)
}

export const dislikeUser = async (user: string): Promise<UserDTO> => {
  return await likeOrDislikeUser(user, false)
}

export const closeFriendUser = async (user: string): Promise<UserDTO> => {
  return await closeFriend(user)
}

export const getNearUsers = async (): Promise<UserDTO[]> => {
  return await searchNearUsers()
}

export const getUserNotifications = async (): Promise<NotificationDTO[]> => {
  return await getNotifications()
}

export const readUserNotification = async (id: string) => {
  return await readNotification(id)
}
