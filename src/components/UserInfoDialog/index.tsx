import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core"
import React, {
  cloneElement,
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectUser, sendMessage } from "../../store/user/actions"
import { getSelectedUser } from "../../store/user/selectors"
import { FieldValue, Message, User } from "../../store/user/types"
import { FaPhoneAlt, FaUserFriends, FaWindowClose } from "react-icons/fa"
import styles from "./UserInfo.module.scss"
import { BiBlock, BiDislike, BiLike, BiTime } from "react-icons/bi"
import { BsPeopleCircle } from "react-icons/bs"
import { formatDate } from "../../utils/date"
import { IoMdCalendar } from "react-icons/io"
import { MdWork } from "react-icons/md"
import { AiOutlineClose } from "react-icons/ai"
import clsx from "clsx"

const LikeDislikeIcon: FC<{
  icon: ReactNode
  active: boolean
  title: string
}> = (props) => {
  const getColor = useCallback(
    () => (props.active ? "blue" : "black"),
    [props.active]
  )

  const [color, setColor] = useState(getColor())

  useEffect(() => {
    setColor(getColor())
  }, [props.active, getColor])

  const handleHover = () => {
    if (!props.active) setColor("blue")
  }

  const handleHoverOut = () => {
    if (!props.active) setColor("black")
  }

  const newIcon = React.Children.map(props.icon, (child) => {
    if (React.isValidElement(child)) {
      return cloneElement(child, {
        color: color,
        onMouseOver: handleHover,
        onMouseOut: handleHoverOut,
      })
    }
    return child
  })

  if (!newIcon) return null

  return (
    <Tooltip title={props.title} className={styles.tooltip}>
      <div>{newIcon as any}</div>
    </Tooltip>
  )
}

const Title: FC<{ user: User; handleClose(): void }> = (props) => {
  const user = props.user

  return (
    <div className={styles["dialog-title"]}>
      <div className={styles["dialog-title-content"]}>
        {user.avatarUrl && <img src={user.avatarUrl.value} alt="User Avatar" />}
        <Typography component="h2">{user.name}</Typography>
        <LikeDislikeIcon
          title={`Like ${user.name}`}
          active={user.liked}
          icon={<BiLike />}
        />
        <LikeDislikeIcon
          title={`Dislike ${user.name}`}
          active={user.disliked}
          icon={<BiDislike />}
        />
        <Tooltip title={`Block ${user.name}`} className={styles.tooltip}>
          <div>
            <BiBlock color="red" />
          </div>
        </Tooltip>
      </div>
      <div className={styles["close-button"]}>
        <AiOutlineClose onClick={props.handleClose} />
      </div>
    </div>
  )
}

const CloseFriends: FC<{ user: User }> = (props) => {
  const user = props.user

  const closeFriendIcon = user.closeFriend ? (
    <FaUserFriends />
  ) : (
    <FaWindowClose />
  )
  const closeFriendText = user.closeFriend
    ? `You and ${user.name} are close friends.`
    : `${user.name} is not a close friend.`

  return (
    <div className={styles["close-friends-container"]}>
      {closeFriendIcon}
      <Typography>{closeFriendText}</Typography>
      {!user.closeFriend && (
        <Button
          variant="text"
          color="primary"
        >{`Request to be ${user.name}'s close friend`}</Button>
      )}
    </div>
  )
}

const PersonalInfoItem: FC<{
  icon: ReactNode
  value?: FieldValue
  valueString?: string
  field: string
}> = (props) => {
  if (!props.value && !props.valueString) return null
  if (props.value && props.value.hide) return null

  const valueToUse = props.valueString || props.value?.value
  return (
    <div className={styles["personal-info-item"]}>
      {props.icon}
      <Typography>{`${props.field}: ${valueToUse}`}</Typography>
    </div>
  )
}

const ContainerTitle: FC<{ title: string }> = (props) => {
  return (
    <div className={styles["container-title"]}>
      <h3>{props.title}</h3>
    </div>
  )
}

const PersonalInfo: FC<{ user: User }> = (props) => {
  const user = props.user

  return (
    <div className={styles["personal-info-container"]}>
      <ContainerTitle title="Personal Info" />
      <Divider />
      <div className={styles["personal-info-container-items-container"]}>
        <PersonalInfoItem
          field="User description"
          icon={<BsPeopleCircle />}
          value={user.description}
        />

        <PersonalInfoItem
          field="Register time at this address"
          icon={<IoMdCalendar />}
          valueString={`Since ${formatDate(user.since)}`}
        />

        <PersonalInfoItem
          field="Phone number"
          icon={<FaPhoneAlt />}
          value={user.cellphone}
        />

        <PersonalInfoItem
          field="User Occupation"
          icon={<MdWork />}
          value={user.occupation}
        />

        <PersonalInfoItem
          field="Available hours for calls"
          icon={<BiTime />}
          value={user.available}
        />
      </div>
    </div>
  )
}

const MessageInput: FC<{ user: User }> = (props) => {
  const [message, setMessage] = useState("")
  const dispatch = useDispatch()

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    dispatch(
      sendMessage(props.user, {
        body: message,
        logged: true,
        sentAt: new Date(),
        id: Math.floor(Math.random() * 10000),
      })
    )
    setMessage("")
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setMessage(e.target.value)
  }

  return (
    <div className={styles["messages-input-container"]}>
      <form onSubmit={handleSubmit} className={styles["messages-input-form"]}>
        <TextField
          onChange={handleChange}
          value={message}
          variant="outlined"
          InputProps={{
            style: { height: "100%" },
          }}
          className={styles["messages-input-input"]}
          placeholder="Type your message"
        />
        <Button
          type="submit"
          className={styles["messages-input-button"]}
          color="primary"
          variant="contained"
        >
          SEND
        </Button>
      </form>
    </div>
  )
}

const MessagesList: FC<{ user: User }> = (props) => {
  const user = props.user
  const [reversedMessages, setReversedMessages] = useState<Message[]>([])

  useEffect(() => {
    const messagesCopy = Array.from(user.messages)
    setReversedMessages(messagesCopy.reverse())
  }, [user])

  return (
    <div className={styles["messages-body-container"]}>
      {reversedMessages.map((message) => (
        <div
          key={message.id}
          className={clsx(
            styles["message-layer"],
            message.logged
              ? styles["message-layer-from-logged-user"]
              : styles["message-layer-from-other-user"]
          )}
        >
          <div className={styles["message-container"]}>
            <p className={styles["message-title"]}>
              {message.logged ? "You" : user.name}
            </p>
            <Divider />
            <p className={styles["message-body"]}>{message.body}</p>
            <p className={styles["message-footer"]}>
              {formatDate(message.sentAt)}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

const Messages: FC<{ user: User }> = (props) => {
  const user = props.user

  return (
    <div className={styles["messages-container"]}>
      <ContainerTitle title="Messages" />
      <Divider />
      <MessagesList user={user} />
      <MessageInput user={user} />
    </div>
  )
}

const MainContent: FC<{ user: User }> = (props) => {
  const user = props.user

  return (
    <div className={styles["main-content-div"]}>
      <PersonalInfo user={user} />
      <Messages user={user} />
    </div>
  )
}

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
      <DialogTitle>
        <Title user={user} handleClose={handleClose} />
      </DialogTitle>
      <DialogContent
        classes={{
          root: styles["zero-padding"],
        }}
        className={styles["dialog-content"]}
      >
        <CloseFriends user={user} />
        <Divider />
        <MainContent user={user} />
      </DialogContent>
    </Dialog>
  )
}
