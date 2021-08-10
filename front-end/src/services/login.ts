import axios from "axios"
import env from "../env/environment"
import { User } from "../store/user/types"
import { getUserFromDTO } from "./util"

export interface SignInResponse {
  token: string
  user: User
}

export const signIn = async (
  email: string,
  password: string
): Promise<SignInResponse> => {
  const response = await axios.post(`${env.baseUrl}/login`, { email, password })
  const token = response.headers["authentication"]
  const user = getUserFromDTO(response.data)
  return {
    token,
    user,
  }
}
