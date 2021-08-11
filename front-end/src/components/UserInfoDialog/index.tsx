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
import {
  blockUser,
  closeFriendRequest,
  dislikeUser,
  likeUser,
  selectUser,
  sendMessage,
} from "../../store/user/actions"
import { getLoggedUser, getSelectedUser } from "../../store/user/selectors"
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
  onClick(): void
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
      <div onClick={props.onClick}>{newIcon as any}</div>
    </Tooltip>
  )
}

const Title: FC<{ user: User; handleClose(): void }> = (props) => {
  const user = props.user
  const dispatch = useDispatch()

  const handleLike = () => {
    dispatch(likeUser(user.id as string))
  }

  const handleDislike = () => {
    dispatch(dislikeUser(user.id as string))
  }

  const handleBlock = () => {
    dispatch(selectUser(undefined))
    dispatch(blockUser(user.id as string))
  }

  return (
    <div className={styles["dialog-title"]}>
      <div className={styles["dialog-title-content"]}>
        {user.avatarUrl && (
          <img
            src={user.avatarUrl.value || "no-avatar.png"}
            alt="User Avatar"
          />
        )}
        <Typography component="h2">{user.name}</Typography>
        <LikeDislikeIcon
          title={`Like ${user.name}`}
          active={!!user.liked}
          icon={<BiLike />}
          onClick={handleLike}
        />
        <LikeDislikeIcon
          title={`Dislike ${user.name}`}
          active={!!user.disliked}
          icon={<BiDislike />}
          onClick={handleDislike}
        />
        <Tooltip title={`Block ${user.name}`} className={styles.tooltip}>
          <div onClick={handleBlock}>
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
  const dispatch = useDispatch()

  const handleCloseFriend = () => {
    dispatch(closeFriendRequest(user.id as string))
  }

  const closeFriendIcon = user.closeFriend ? (
    <FaUserFriends />
  ) : (
    <FaWindowClose />
  )
  const getCloseFriendText = () => {
    if (user.closeFriend === "yes") {
      return `You and ${user.name} are close friends.`
    }
    if (user.closeFriend === "no") {
      return `${user.name} is not a close friend.`
    }
    if (user.closeFriend === "he-requested") {
      return `${user.name} requested to be your close friend.`
    }
    if (user.closeFriend === "you-requested") {
      return `You requested to be a close friend of ${user.name}.`
    }
  }

  return (
    <div className={styles["close-friends-container"]}>
      {closeFriendIcon}
      <Typography>{getCloseFriendText()}</Typography>
      {(user.closeFriend === "no" || user.closeFriend === "he-requested") && (
        <Button
          variant="text"
          color="primary"
          onClick={handleCloseFriend}
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
  user: User
}> = (props) => {
  if (!props.value && !props.valueString) return null
  if (props.value && props.value.hide && props.user.closeFriend !== "yes")
    return null

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
          user={user}
        />

        <PersonalInfoItem
          field="Register time at this address"
          icon={<IoMdCalendar />}
          user={user}
          valueString={`Since ${formatDate(user.since)}`}
        />

        <PersonalInfoItem
          field="Phone number"
          icon={<FaPhoneAlt />}
          value={user.cellphone}
          user={user}
        />

        <PersonalInfoItem
          field="User Occupation"
          icon={<MdWork />}
          value={user.occupation}
          user={user}
        />

        <PersonalInfoItem
          field="Available hours for calls"
          icon={<BiTime />}
          value={user.available}
          user={user}
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
  const loggedUser = useSelector(getLoggedUser)
  const [reversedMessages, setReversedMessages] = useState<Message[]>([])

  useEffect(() => {
    if (!user.messages) return
    const messagesCopy = Array.from(user.messages)
    setReversedMessages(
      messagesCopy.sort(
        (a, b) => (b.sentAt as Date).getTime() - (a.sentAt as Date).getTime()
      )
    )
  }, [user])

  if (!loggedUser) return null

  return (
    <div className={styles["messages-body-container"]}>
      {reversedMessages.map((message) => (
        <div
          key={message.id}
          className={clsx(
            styles["message-layer"],
            message.sender === loggedUser.id
              ? styles["message-layer-from-logged-user"]
              : styles["message-layer-from-other-user"]
          )}
        >
          <div className={styles["message-container"]}>
            <p className={styles["message-title"]}>
              {message.sender === loggedUser.id ? "You" : user.name}
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
