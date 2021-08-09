import axios from "axios"
import env from "../env/environment"
import store from "../store"
import { User } from "../store/user/types"
import { getUserFromDTO } from "./util"

export const likeUser = async (id: string): Promise<User> => {
  const token = store.getState().user.token
  const response = await axios.get(
    `${env.baseUrl}/user/interaction/${id}/like`,
    { headers: { authentication: token } }
  )
  return getUserFromDTO(response.data)
}

export const dislikeUser = async (id: string): Promise<User> => {
  const token = store.getState().user.token
  const response = await axios.get(
    `${env.baseUrl}/user/interaction/${id}/dislike`,
    { headers: { authentication: token } }
  )
  return getUserFromDTO(response.data)
}

export const closeFriendRequest = async (id: string): Promise<User> => {
  const token = store.getState().user.token
  const response = await axios.get(
    `${env.baseUrl}/user/interaction/${id}/closefriend`,
    { headers: { authentication: token } }
  )
  return getUserFromDTO(response.data)
}
