import { action } from "typesafe-actions"
import { Message, User, UserActions } from "./types"

export const selectUser = (user: User | undefined) =>
  action(UserActions.SELECT_USER, { user })

export const sendMessage = (user: User, message: Message) =>
  action(UserActions.SEND_MESSAGE, { user, message })

export const showProfile = (value: boolean) =>
  action(UserActions.SHOW_PROFILE, { value })

export const startChangingLocation = (callback: () => void) =>
  action(UserActions.CHANGE_LOCATION, { callback, value: true })

export const stopChangingLocation = () =>
  action(UserActions.CHANGE_LOCATION, { callback: undefined, value: false })
