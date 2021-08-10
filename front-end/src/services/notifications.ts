import axios from "axios"
import env from "../env/environment"
import store from "../store"

export const fetchNotifications = async (): Promise<Notification[]> => {
  const token = store.getState().user.token
  const response = await axios.get(`${env.baseUrl}/user/notifications`, {
    headers: { authentication: token },
  })
  return response.data.map((el: any) => ({
    id: el.id,
    content: el.content,
    user: el.user,
    moment: new Date(el.moment),
  }))
}

export const readNotification = async (id: string): Promise<Notification[]> => {
  const token = store.getState().user.token
  const response = await axios.get(
    `${env.baseUrl}/user/notifications/${id}/read`,
    {
      headers: { authentication: token },
    }
  )
  return response.data.map((el: any) => ({
    id: el.id,
    content: el.content,
    user: el.user,
    moment: new Date(el.moment),
  }))
}
