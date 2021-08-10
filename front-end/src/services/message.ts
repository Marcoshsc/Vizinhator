import axios from "axios"
import env from "../env/environment"
import store from "../store"
import { User } from "../store/user/types"
import { getUserFromDTO } from "./util"

export const sendMessage = async (id: string, body: string): Promise<User> => {
  const token = store.getState().user.token
  const response = await axios.post(
    `${env.baseUrl}/user/message/${id}`,
    { content: body },
    { headers: { authentication: token } }
  )
  return getUserFromDTO(response.data)
}
