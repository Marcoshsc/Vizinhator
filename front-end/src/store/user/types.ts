export interface FieldValue {
  value: string | undefined
  hide: boolean
}

export interface Address {
  description: string
  location: [number, number]
}

export interface Notification {
  content: string
  user: string
  id: string
  moment: Date
}

export interface User {
  id?: string
  name: string
  cellphone?: FieldValue
  occupation?: FieldValue
  since?: Date
  likes?: number
  dislikes?: number
  avatarUrl?: FieldValue
  available?: FieldValue
  description?: FieldValue
  position: [number, number]
  closeFriend?: "no" | "yes" | "you-requested" | "he-requested"
  liked?: boolean
  disliked?: boolean
  messages?: Message[]
  email?: string
  password?: string
}

export interface Message {
  id?: string
  body: string
  sender?: string
  receiver?: string
  sentAt?: Date
}

export interface BlockedUser {
  id: string
  name: string
}

export enum UserActions {
  SELECT_USER = "@user/SELECT_USER",
  SELECT_USER_STRING = "@user/SELECT_USER_STRING",
  SEND_MESSAGE = "@user/SEND_MESSAGE",
  SHOW_PROFILE = "@user/SHOW_PROFILE",
  CHANGE_LOCATION = "@user/CHANGE_LOCATION",
  SELECT_LOCATION = "@user/SELECT_LOCATION",
  CLOSE_FIRST_ACCESS = "@user/CLOSE_FIRST_ACCESS",
  LOGIN = "@user/LOGIN",
  SIGNUP_STATE = "@user/SIGNUP_STATE",
  SIGN_IN = "@user/SIGN_IN",
  SIGN_IN_INTERN = "@user/SIGN_IN_INTERN",
  SIGN_UP = "@user/SIGN_UP",
  SIGN_UP_INTERN = "@user/SIGN_UP_INTERN",
  FETCH_NEIGHBOURS = "@user/FETCH_NEIGHBOURS",
  FETCH_NEIGHBOURS_INTERN = "@user/FETCH_NEIGHBOURS_INTERN",
  EDIT_USER = "@user/EDIT_USER",
  EDIT_USER_INTERN = "@user/EDIT_USER_INTERN",
  LIKE_USER = "@user/LIKE_USER",
  DISLIKE_USER = "@user/DISLIKE_USER",
  CLOSE_FRIEND_REQUEST = "@user/CLOSE_FRIEND_REQUEST",
  UPDATE_NOTLOGGED_USER = "@user/UPDATE_NOTLOGGED_USER",
  GET_NOTIFICATIONS = "@user/GET_NOTIFICATIONS",
  GET_NOTIFICATIONS_INTERN = "@user/GET_NOTIFICATIONS_INTERN",
  SHOW_NOTIFICATIONS = "@user/SHOW_NOTIFICATIONS",
  READ_NOTIFICATION = "@user/READ_NOTIFICATION",
  LOGOUT = "@user/LOGOUT",
  BLOCK_USER = "@user/BLOCK_USER",
  GET_BLOCKED_USERS = "@user/GET_BLOCKED_USERS",
  GET_BLOCKED_USERS_INTERN = "@user/GET_BLOCKED_USERS_INTERN",
  SYNC = "@user/SYNC",
  STOP_SYNC = "@user/STOP_SYNC",
  SHOW_BLOCK = "@user/SHOW_BLOCK",
}

export interface UserState {
  selected?: string
  users: User[]
  logged?: User
  token?: string
  blocked: BlockedUser[]
  showProfile: boolean
  changingLocation: boolean
  changingLocationCallback?(): void
  selectedLocation?: Address
  firstAccess: boolean
  signup: boolean
  login: boolean
  showingNotifications: boolean
  showingBlock: boolean
  notifications: Notification[]
}
