import { UserDTO } from '../model/user'
import { authenticate } from './mongodb/auth'
import {
  addUser as mongoDBAddUser,
  getUser as mongoDBGetUser,
  editUser as mongoDBEditUser,
} from './mongodb/insert'

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
): Promise<string> => {
  return await authenticate(email, password)
}
