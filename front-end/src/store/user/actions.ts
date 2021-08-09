import { action } from "typesafe-actions"
import { Address, Message, User, UserActions } from "./types"

export const selectUser = (user: User | undefined) =>
  action(UserActions.SELECT_USER, { user })

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
