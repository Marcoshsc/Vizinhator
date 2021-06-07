import { action } from "typesafe-actions"
import { Message, User, UserActions } from "./types"

export const selectUser = (user: User | undefined) =>
  action(UserActions.SELECT_USER, { user })

export const sendMessage = (user: User, message: Message) =>
  action(UserActions.SEND_MESSAGE, { user, message })
