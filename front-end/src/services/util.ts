import { Message, User } from "../store/user/types"

export interface GeoJSON {
  type: string
  coordinates: [number, number]
}

export interface FieldValue {
  value: string | undefined
  hide: boolean
}

export interface MessageDTO {
  id: string
  content: string
  sentAt: string
  sender: string
  receiver: string
}

export interface UserDTO {
  id?: string
  location: GeoJSON
  name: string
  cellphone: FieldValue
  occupation: FieldValue
  avatarUrl: FieldValue
  available: FieldValue
  description: FieldValue
  since?: string
  likes?: number
  dislikes?: number
  closeFriend?: "no" | "yes" | "you-requested" | "he-requested"
  liked?: boolean
  disliked?: boolean
  messages?: MessageDTO[]
  password?: string
  email?: string
}

export const getMessageFromDTO = (message: MessageDTO): Message => {
  return {
    id: message.id,
    body: message.content,
    receiver: message.receiver,
    sender: message.sender,
    sentAt: new Date(message.sentAt),
    logged: false,
  }
}

export const getDTOFromUser = (user: User): UserDTO => {
  return {
    available: user.available as FieldValue,
    avatarUrl: user.avatarUrl as FieldValue,
    cellphone: user.cellphone as FieldValue,
    description: user.description as FieldValue,
    occupation: user.occupation as FieldValue,
    location: {
      type: "Point",
      coordinates: user.position,
    },
    name: user.name,
    email: user.email,
    password: user.password,
  }
}

export const getUserFromDTO = (user: UserDTO): User => {
  return {
    id: user.id as string,
    closeFriend: !!user.closeFriend,
    disliked: !!user.disliked,
    liked: !!user.liked,
    likes: user.likes as number,
    dislikes: user.dislikes as number,
    name: user.name,
    position: user.location.coordinates,
    since: user.since ? new Date(user.since) : undefined,
    available: user.available,
    avatarUrl: user.avatarUrl,
    description: user.description,
    cellphone: user.cellphone,
    occupation: user.occupation,
    messages: (user.messages as MessageDTO[]).map(getMessageFromDTO),
  }
}
