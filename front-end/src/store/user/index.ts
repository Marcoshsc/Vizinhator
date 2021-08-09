import { Reducer } from "redux"
import { Message, User, UserActions, UserState } from "./types"

const date = new Date()
date.setDate(21)
date.setMonth(5)
date.setFullYear(2020)

const INITIAL_STATE: UserState = {
  selected: undefined,
  changingLocation: false,
  showProfile: false,
  firstAccess: true,
  login: false,
  users: [],
  signup: false,
}

const reducer: Reducer<UserState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActions.SELECT_USER: {
      const user: User | undefined = action.payload.user
      return { ...state, selected: user?.id }
    }
    case UserActions.SIGNUP_STATE: {
      return { ...state, signup: action.payload.value }
    }
    case UserActions.CHANGE_LOCATION: {
      return {
        ...state,
        changingLocation: action.payload.value,
        changingLocationCallback: action.payload.callback,
      }
    }
    case UserActions.SEND_MESSAGE: {
      const message: Message = action.payload.message
      const user: User = action.payload.user
      const entityUser = state.users.find((el) => el.id === user.id) as User
      if (!entityUser.messages) return { ...state }
      entityUser.messages.push(message)
      return {
        ...state,
        users: [
          ...state.users.filter((el) => el.id !== user.id),
          { ...entityUser, messages: [...entityUser.messages] },
        ],
      }
    }
    case UserActions.SIGN_IN_INTERN: {
      return {
        ...state,
        token: action.payload.token,
        logged: action.payload.user,
        login: false,
      }
    }
    case UserActions.SIGN_UP_INTERN: {
      return {
        ...state,
        token: action.payload.token,
        logged: action.payload.data,
        signup: false,
      }
    }
    case UserActions.FETCH_NEIGHBOURS_INTERN: {
      return { ...state, users: action.payload.users }
    }
    case UserActions.SHOW_PROFILE: {
      return { ...state, showProfile: action.payload.value }
    }
    case UserActions.SELECT_LOCATION: {
      return { ...state, selectedLocation: action.payload.location }
    }
    case UserActions.CLOSE_FIRST_ACCESS: {
      return { ...state, firstAccess: false }
    }
    case UserActions.LOGIN: {
      return { ...state, login: action.payload.value }
    }
    default:
      return state
  }
}

export default reducer
