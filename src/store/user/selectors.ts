import { ApplicationState } from "../rootReducer"

export const getSelectedUser = ({ user }: ApplicationState) => user.selected
