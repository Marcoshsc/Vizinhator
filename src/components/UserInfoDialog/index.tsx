import { Dialog } from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"
import { selectUser } from "../../store/user/actions"
import { getSelectedUser } from "../../store/user/selectors"

export default function UserInfoDialog() {
  const selectedUser = useSelector(getSelectedUser)
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(selectUser(undefined))
  }

  return (
    <Dialog open={!!selectedUser} onClose={handleClose}>
      <h1>Hello!</h1>
    </Dialog>
  )
}
