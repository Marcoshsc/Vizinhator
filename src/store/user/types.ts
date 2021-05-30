export interface User {
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
