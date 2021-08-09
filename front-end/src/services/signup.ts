import axios from "axios"
import env from "../env/environment"
import { User } from "../store/user/types"
import { getDTOFromUser, getUserFromDTO } from "./util"

export interface SignInResponse {
  token: string
  user: User
}

export const signUp = async (data: User): Promise<SignInResponse> => {
  const response = await axios.post(
    `${env.baseUrl}/user/insert`,
    getDTOFromUser(data)
  )
  const token = response.headers["authentication"]
  const user = getUserFromDTO(response.data)
  return {
    token,
    user,
  }
}
