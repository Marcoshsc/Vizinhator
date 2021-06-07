import { action } from "typesafe-actions"
import { User, UserActions } from "./types"

export const selectUser = (user: User | undefined) =>
  action(UserActions.SELECT_USER, { user })
