export interface FieldValue {
  value: string | undefined
  hide: boolean
}

export interface Address {
  description: string
  location: [number, number]
}

export interface User {
  id: number
  name: string
  cellphone?: FieldValue
  occupation?: FieldValue
  since: Date | undefined
  likes: number
  dislikes: number
  avatarUrl?: FieldValue
  available?: FieldValue
  description?: FieldValue
  position: [number, number]
  closeFriend: boolean
  liked: boolean
  disliked: boolean
  messages: Message[]
}

export interface Message {
  id: number
  body: string
  logged: boolean
  sentAt: Date
}

export enum UserActions {
  SELECT_USER = "@user/SELECT_USER",
  SEND_MESSAGE = "@user/SEND_MESSAGE",
  SHOW_PROFILE = "@user/SHOW_PROFILE",
  CHANGE_LOCATION = "@user/CHANGE_LOCATION",
  SELECT_LOCATION = "@user/SELECT_LOCATION",
}

export interface UserState {
  selected?: number
  users: User[]
  logged: User
  showProfile: boolean
  changingLocation: boolean
  changingLocationCallback?(): void
  selectedLocation?: Address
}
