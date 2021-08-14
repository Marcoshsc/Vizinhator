import { UserDTO } from '../../model/user'
import httpContext from 'express-http-context'
import { levelDatabase } from './database'
import { getNearUsers, getUserDTOFromLevelUser } from './insert'
import { canInteractLevel } from './util'

export async function searchNearUsersLevel(): Promise<UserDTO[]> {
  const loggedUser = httpContext.get('loggedUser')
  const dbUsers = await levelDatabase.get('users')
  const users = getNearUsers(loggedUser, dbUsers)
  return users
    .filter((el) => canInteractLevel(el, loggedUser))
    .map(getUserDTOFromLevelUser)
}
