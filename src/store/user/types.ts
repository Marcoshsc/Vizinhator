export interface User {
  id: number
  name: string
  cellphone: string | undefined
  occupation: string | undefined
  since: Date | undefined
  likes: number
  dislikes: number
  avatarUrl: string | undefined
  available: string | undefined
  description: string | undefined
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
}

export interface UserState {
  selected?: number
  users: User[]
  logged: User
}
