import { User, UserDTO } from '../../model/user'
import httpContext from 'express-http-context'
import { canInteract, getUserDTOFromUser } from './util'

export async function searchNearUsers(): Promise<UserDTO[]> {
  const loggedUser = httpContext.get('loggedUser')
  const users = await User.find({
    _id: {
      $ne: loggedUser._id,
    },
    position: {
      $near: {
        $geometry: loggedUser.position,
        $maxDistance: 400,
      },
    },
  })
  return users
    .filter((el) => canInteract(el, loggedUser))
    .map(getUserDTOFromUser)
}
