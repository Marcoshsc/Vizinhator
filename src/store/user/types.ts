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
}

export enum UserActions {
  SELECT_USER = "@user/SELECT_USER",
}

export interface UserState {
  selected?: number
  users: User[]
}
