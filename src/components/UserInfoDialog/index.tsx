import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"
import { selectUser } from "../../store/user/actions"
import { getSelectedUser } from "../../store/user/selectors"
import styles from "./UserInfo.module.scss"

export default function UserInfoDialog() {
  const user = useSelector(getSelectedUser)
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(selectUser(undefined))
  }

  if (!user) return null

  return (
    <Dialog
      open={!!user}
      onClose={handleClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        className: styles.dialog,
      }}
    >
      <DialogTitle>{user.name}</DialogTitle>
      <DialogContent></DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  )
}
