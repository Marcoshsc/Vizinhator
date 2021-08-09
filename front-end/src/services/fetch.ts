import axios from "axios"
import env from "../env/environment"
import store from "../store"
import { User } from "../store/user/types"
import { getUserFromDTO } from "./util"

export const fetchNeighbours = async (): Promise<User[]> => {
  const token = store.getState().user.token as string
  const response = await axios.get(`${env.baseUrl}/user/near`, {
    headers: { authentication: token },
  })
  return response.data.map(getUserFromDTO)
}
