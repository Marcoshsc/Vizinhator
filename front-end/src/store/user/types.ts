export interface FieldValue {
  value: string | undefined
  hide: boolean
}

export interface Address {
  description: string
  location: [number, number]
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
  closeFriend?: boolean
  liked?: boolean
  disliked?: boolean
  messages?: Message[]
  email?: string
  password?: string
}

export interface Message {
  id: string
  body: string
  logged: boolean
  sender: string
  receiver: string
  sentAt: Date
}

export enum UserActions {
  SELECT_USER = "@user/SELECT_USER",
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
}

export interface UserState {
  selected?: string
  users: User[]
  logged?: User
  token?: string
  showProfile: boolean
  changingLocation: boolean
  changingLocationCallback?(): void
  selectedLocation?: Address
  firstAccess: boolean
  signup: boolean
  login: boolean
}
