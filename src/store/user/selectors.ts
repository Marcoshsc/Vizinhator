import { createSelector } from "reselect"
import { ApplicationState } from "../rootReducer"

export const getUsers = ({ user }: ApplicationState) => user.users

const getSelectedUserId = ({ user }: ApplicationState) => user.selected

export const getLoggedUser = ({ user }: ApplicationState) => user.logged

export const getSelectedUser = createSelector(
  getUsers,
  getSelectedUserId,
  (users, id) => users.find((el) => el.id === id)
)
