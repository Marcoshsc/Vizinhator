import { Reducer } from "redux"
import { combineReducers } from "redux"
import userReducer from "./user"
import { UserState } from "./user/types"

const rootReducer: Reducer<ApplicationState> = combineReducers({
  user: userReducer,
})

export interface ApplicationState {
  user: UserState
}

export default rootReducer
