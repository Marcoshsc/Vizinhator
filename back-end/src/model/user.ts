import mongoose from 'mongoose'

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
})

const fieldValueSchema = new mongoose.Schema({
  value: {
    type: String,
    required: false,
  },
  hide: {
    type: Boolean,
    required: true,
  },
})

const messageSchema = new mongoose.Schema({
  receiverId: { type: String, required: true },
  senderId: { type: String, required: true },
  sentAt: { type: Date, required: true },
  content: { type: String, required: true },
})

interface Message {
  content: string
  sentAt: Date
}

messageSchema.virtual('sender', {
  ref: 'User',
  localField: 'senderId',
  foreignField: '_id',
  justOne: false,
})

messageSchema.virtual('receiver', {
  ref: 'User',
  localField: 'receiverId',
  foreignField: '_id',
  justOne: false,
})

export interface GeoJSON {
  type: string
  coordinates: [number, number]
}

const userSchema = new mongoose.Schema({
  position: {
    type: pointSchema,
    required: true,
  },
  name: { type: String, required: true },
  cellphone: { type: fieldValueSchema, required: true },
  occupation: { type: fieldValueSchema, required: true },
  avatarUrl: { type: fieldValueSchema, required: true },
  description: { type: fieldValueSchema, required: true },
  available: { type: fieldValueSchema, required: true },
  since: { type: Date, required: true },
  closeFriendsIds: { type: [String], required: true },
  likedBy: { type: [String], required: true },
  dislikedBy: { type: [String], required: true },
  messages: { type: [messageSchema], required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
})

export interface FieldValue {
  value?: string
  hide: boolean
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
  since?: Date
  likes?: number
  dislikes?: number
  closeFriend?: boolean
  liked?: boolean
  disliked?: boolean
  messages?: Message[]
  password?: string
  email?: string
}

userSchema.virtual('closeFriends', {
  ref: 'User',
  localField: 'closeFriendIds',
  foreignField: '_id',
  justOne: false,
})

export const User = mongoose.model('User', userSchema)
