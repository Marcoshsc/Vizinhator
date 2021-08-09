import axios from "axios"
import env from "../env/environment"
import store from "../store"
import { User } from "../store/user/types"
import { getDTOFromUser, getUserFromDTO } from "./util"

export interface SignInResponse {
  token: string
  user: User
}

export const editUser = async (data: User): Promise<User> => {
  const token = store.getState().user.token as string
  const response = await axios.put(
    `${env.baseUrl}/user`,
    getDTOFromUser(data),
    {
      headers: {
        authentication: token,
      },
    }
  )
  return getUserFromDTO(response.data)
}
