import { UserDTO } from '../model/user'
import { authenticate } from './mongodb/auth'
import {
  addUser as mongoDBAddUser,
  getUser as mongoDBGetUser,
  editUser as mongoDBEditUser,
} from './mongodb/insert'
import { closeFriend, likeOrDislikeUser } from './mongodb/interaction'
import { sendMessage } from './mongodb/message'
import { searchNearUsers } from './mongodb/search'

export interface AuthResponse {
  token: string
  user: UserDTO
}

export const addUser = async (userDTO: UserDTO): Promise<UserDTO> => {
  return mongoDBAddUser(userDTO)
}

export const editUser = async (
  id: string,
  userDTO: UserDTO
): Promise<UserDTO> => {
  return mongoDBEditUser(id, userDTO)
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

export const likeUser = async (user: string) => {
  await likeOrDislikeUser(user, true)
}

export const dislikeUser = async (user: string) => {
  await likeOrDislikeUser(user, false)
}

export const closeFriendUser = async (user: string) => {
  await closeFriend(user)
}

export const getNearUsers = async (): Promise<UserDTO[]> => {
  return await searchNearUsers()
}
