import { Reducer } from "redux"
import { User, UserActions, UserState } from "./types"

const INITIAL_STATE: UserState = {
  selected: undefined,
}

const reducer: Reducer<UserState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActions.SELECT_USER: {
      const user: User = action.payload.user
      return { ...state, selected: user }
    }
    default:
      return state
  }
}

export default reducer
