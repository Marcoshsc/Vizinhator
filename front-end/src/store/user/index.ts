import { Reducer } from "redux"
import { User, UserActions, UserState } from "./types"

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
  showingNotifications: false,
  notifications: [],
}

const reducer: Reducer<UserState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActions.SELECT_USER: {
      const user: User | undefined = action.payload.user
      return { ...state, selected: user?.id }
    }
    case UserActions.LOGOUT: {
      return INITIAL_STATE
    }
    case UserActions.SELECT_USER_STRING: {
      const user: string = action.payload.user
      return { ...state, selected: user }
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
    case UserActions.SHOW_NOTIFICATIONS: {
      return { ...state, showingNotifications: action.payload.value }
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
    case UserActions.GET_NOTIFICATIONS_INTERN: {
      return { ...state, notifications: action.payload.notifications }
    }
    case UserActions.EDIT_USER_INTERN: {
      return {
        ...state,
        logged: action.payload.user,
      }
    }
    case UserActions.UPDATE_NOTLOGGED_USER: {
      return {
        ...state,
        users: [
          ...state.users.filter((el) => el.id !== action.payload.id),
          action.payload.user,
        ],
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
