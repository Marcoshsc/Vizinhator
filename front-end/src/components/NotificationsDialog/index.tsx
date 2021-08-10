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
import {
  readNotification,
  selectUserId,
  showNotifications,
} from "../../store/user/actions"
import {
  getNotifications,
  isShowingNotifications,
} from "../../store/user/selectors"
import { Notification } from "../../store/user/types"
import { formatDateWithTime } from "../../utils/date"
import styles from "./styles.module.scss"

const NotificationDialog: FC = () => {
  const notifications = useSelector(getNotifications)
  const open = useSelector(isShowingNotifications)
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(showNotifications(false))
  }

  const handleSeeNotification = (notification: Notification) => {
    return () => {
      dispatch(readNotification(notification.id))
      dispatch(selectUserId(notification.user))
      dispatch(showNotifications(false))
    }
  }

  const handleMarkAsRead = (notification: Notification) => {
    const callback: React.MouseEventHandler<HTMLButtonElement> = (e) => {
      e.stopPropagation()
      dispatch(readNotification(notification.id))
    }
    return callback
  }

  return (
    <Dialog fullWidth maxWidth="md" open={open}>
      <DialogTitle>{`${notifications.length} Notifications`}</DialogTitle>
      <DialogContent className={styles.content}>
        {notifications.map((el) => (
          <div
            key={el.id}
            onClick={handleSeeNotification(el)}
            className={styles.notification}
          >
            <Typography>{`${formatDateWithTime(el.moment)} - ${
              el.content
            }`}</Typography>
            <Button onClick={handleMarkAsRead(el)}>Mark as read</Button>
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

export default NotificationDialog
