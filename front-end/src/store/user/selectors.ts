import { createSelector } from "reselect"
import { ApplicationState } from "../rootReducer"

export const getUsers = ({ user }: ApplicationState) => user.users

const getSelectedUserId = ({ user }: ApplicationState) => user.selected

export const getLoggedUser = ({ user }: ApplicationState) => user.logged

export const getSelectedLocation = ({ user }: ApplicationState) =>
  user.selectedLocation

export const isShowingProfile = ({ user }: ApplicationState) => user.showProfile

export const isFirstAccess = ({ user }: ApplicationState) => user.firstAccess

export const isLogin = ({ user }: ApplicationState) => user.login

export const isChangingLocation = ({ user }: ApplicationState) => ({
  value: user.changingLocation,
  callback: user.changingLocationCallback,
})

export const getSelectedUser = createSelector(
  getUsers,
  getSelectedUserId,
  (users, id) => users.find((el) => el.id === id)
)

export const isSignup = ({ user }: ApplicationState) => user.signup

export const getToken = ({ user }: ApplicationState) => user.token

export const getNotifications = ({ user }: ApplicationState) =>
  user.notifications

export const isShowingNotifications = ({ user }: ApplicationState) =>
  user.showingNotifications

export const getBlockedUsers = ({ user }: ApplicationState) => user.blocked

export const isShowingBlock = ({ user }: ApplicationState) => user.showingBlock
