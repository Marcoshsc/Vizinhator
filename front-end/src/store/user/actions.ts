import { action } from "typesafe-actions"
import { Address, BlockedUser, Message, User, UserActions } from "./types"

export const logout = () => action(UserActions.LOGOUT, {})

export const selectUser = (user: User | undefined) =>
  action(UserActions.SELECT_USER, { user })

export const selectUserId = (user: string) =>
  action(UserActions.SELECT_USER_STRING, { user })

export const sendMessage = (user: User, message: Message) =>
  action(UserActions.SEND_MESSAGE, { user, message })

export const showProfile = (value: boolean) =>
  action(UserActions.SHOW_PROFILE, { value })

export const startChangingLocation = (
  callback: (location: [number, number]) => void
) => action(UserActions.CHANGE_LOCATION, { callback, value: true })

export const stopChangingLocation = () =>
  action(UserActions.CHANGE_LOCATION, { callback: undefined, value: false })

export const selectLocation = (location: Address | undefined) =>
  action(UserActions.SELECT_LOCATION, { location })

export const closeFirstAccess = () => action(UserActions.CLOSE_FIRST_ACCESS, {})

export const login = (value: boolean) => action(UserActions.LOGIN, { value })

export const signIn = (email: string, password: string) =>
  action(UserActions.SIGN_IN, { email, password })

export const signInIntern = (token: string, user: User) =>
  action(UserActions.SIGN_IN_INTERN, { token, user })

export const signUpState = (value: boolean) =>
  action(UserActions.SIGNUP_STATE, { value })

export const signUp = (data: User) => action(UserActions.SIGN_UP, { data })

export const signUpIntern = (token: string, data: User) =>
  action(UserActions.SIGN_UP_INTERN, { data, token })

export const fetchNeighbours = () => action(UserActions.FETCH_NEIGHBOURS, {})

export const fetchNeighboursIntern = (users: User[]) =>
  action(UserActions.FETCH_NEIGHBOURS_INTERN, { users })

export const editUser = (user: User) => action(UserActions.EDIT_USER, { user })

export const editUserIntern = (user: User) =>
  action(UserActions.EDIT_USER_INTERN, { user })

export const likeUser = (id: string) => action(UserActions.LIKE_USER, { id })
export const dislikeUser = (id: string) =>
  action(UserActions.DISLIKE_USER, { id })
export const closeFriendRequest = (id: string) =>
  action(UserActions.CLOSE_FRIEND_REQUEST, { id })

export const updateNotLoggedUser = (id: string, user: User) =>
  action(UserActions.UPDATE_NOTLOGGED_USER, { id, user })

export const getNotifications = () => action(UserActions.GET_NOTIFICATIONS, {})
export const getNotificationsIntern = (notifications: Notification[]) =>
  action(UserActions.GET_NOTIFICATIONS_INTERN, { notifications })

export const showNotifications = (value: boolean) =>
  action(UserActions.SHOW_NOTIFICATIONS, { value })

export const readNotification = (id: string) =>
  action(UserActions.READ_NOTIFICATION, { id })

export const getBlockedUsers = () => action(UserActions.GET_BLOCKED_USERS, {})

export const getBlockedUsersIntern = (blocked: BlockedUser[]) =>
  action(UserActions.GET_BLOCKED_USERS_INTERN, { blocked })

export const blockUser = (id: string) => action(UserActions.BLOCK_USER, { id })

export const sync = () => action(UserActions.SYNC)

export const stopSync = () => action(UserActions.STOP_SYNC)

export const showBlock = (value: boolean) =>
  action(UserActions.SHOW_BLOCK, { value })
