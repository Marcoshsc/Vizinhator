import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core"
import React, { FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { blockUser, showBlock } from "../../store/user/actions"
import { getBlockedUsers, isShowingBlock } from "../../store/user/selectors"
import { BlockedUser } from "../../store/user/types"
import styles from "./styles.module.scss"

const BlockedUsersDialog: FC = () => {
  const blockedUsers = useSelector(getBlockedUsers)
  const open = useSelector(isShowingBlock)
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(showBlock(false))
  }

  const handleUnblock = (user: BlockedUser) => {
    const callback: React.MouseEventHandler<HTMLButtonElement> = (e) => {
      e.stopPropagation()
      dispatch(blockUser(user.id))
    }
    return callback
  }

  return (
    <Dialog fullWidth maxWidth="md" open={open}>
      <DialogTitle>{`${blockedUsers.length} Blocked Users`}</DialogTitle>
      <DialogContent className={styles.content}>
        {blockedUsers.map((el) => (
          <div key={el.id} className={styles.notification}>
            <Typography>{`${el.name}`}</Typography>
            <Button onClick={handleUnblock(el)}>Unblock</Button>
          </div>
        ))}
      </DialogContent>
      <DialogActions className={styles.actions}>
        <Button color="secondary" onClick={handleClose}>
          CLOSE
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default BlockedUsersDialog
