import { UserDTO } from '../model/user'
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
