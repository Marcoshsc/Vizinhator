import { Button, Divider, Tooltip, Typography } from "@material-ui/core"
import L, { Marker as LeafletMarker } from "leaflet"
import React, { FC, ReactNode, useRef } from "react"
import { FaPhoneAlt } from "react-icons/fa"
import { MdWork } from "react-icons/md"
import { BiTime, BiLike, BiDislike } from "react-icons/bi"
import { IoMdCalendar } from "react-icons/io"
import { BsPeopleCircle } from "react-icons/bs"
import { Marker, Popup } from "react-leaflet"
import { FieldValue, User } from "../../store/user/types"
import styles from "./UserMarker.module.scss"
import "./Popup.scss"
import clsx from "clsx"
import { useDispatch } from "react-redux"
import { selectUser } from "../../store/user/actions"
import { formatDate } from "../../utils/date"

const getAvatarIcon = (
  size: number,
  avatarUrl: string = "no-avatar.png"
): L.Icon => {
  return L.icon({
    iconUrl: avatarUrl || "no-avatar.png",
    iconSize: [size, size],
    iconAnchor: [0, 0],
    popupAnchor: [size / 2, size / 2],
    className: styles.marker,
  })
}

export interface UserMarkerProps {
  user: User
}

interface SimplePopupItemProps {
  valueString?: string
  value?: FieldValue
  title: string
  icon: ReactNode
  user: User
}

const SimplePopupItem: FC<SimplePopupItemProps> = (props) => {
  if (!props.value && !props.valueString) return null
  if (props.value && props.value.hide && props.user.closeFriend !== "yes")
    return null

  const valueToUse = props.valueString || props.value?.value
  return (
    <>
      <Tooltip title={props.title}>
        <div className={styles["popup-item"]}>
          {props.icon}
          <Typography>{valueToUse}</Typography>
        </div>
      </Tooltip>
      <Divider />
    </>
  )
}

interface CustomPopupItemProps {
  children: ReactNode
  title?: string
  additionalClasses?: string[]
}

const CustomPopupItem: FC<CustomPopupItemProps> = (props) => {
  const additionalClasses = props.additionalClasses || []

  const commonPart = (
    <div className={clsx(styles["popup-item"], ...additionalClasses)}>
      {props.children}
    </div>
  )

  return props.title ? (
    <Tooltip title={props.title}>{commonPart}</Tooltip>
  ) : (
    commonPart
  )
}

export interface PopupTitleProps {
  user: User
}

const PopupTitle: FC<PopupTitleProps> = (props) => {
  const user = props.user

  return (
    <div className={clsx(styles["popup-item"], styles["title"])}>
      {user.avatarUrl && (
        <img
          className={styles["avatar"]}
          width={20}
          height={20}
          src={user.avatarUrl?.value || "no-avatar.png"}
          alt="User Avatar"
        />
      )}
      <Typography component="h2">{user.name}</Typography>
    </div>
  )
}

const UserMarker: FC<UserMarkerProps> = ({ user }) => {
  const iconSize = 30
  const dispatch = useDispatch()
  const markerRef = useRef<LeafletMarker>(null)

  const handleSeeMore = () => {
    if (markerRef.current) {
      markerRef.current.closePopup()
    }
    dispatch(selectUser(user))
  }

  return (
    <Marker
      ref={markerRef}
      position={user.position}
      icon={getAvatarIcon(iconSize, user.avatarUrl?.value)}
    >
      <Popup className="user-marker-popup">
        <PopupTitle user={user} />
        <SimplePopupItem
          title="User description"
          icon={<BsPeopleCircle />}
          value={user.description}
          user={user}
        />
        <SimplePopupItem
          title="Register time at this address"
          icon={<IoMdCalendar />}
          valueString={`Since ${formatDate(user.since)}`}
          user={user}
        />
        <SimplePopupItem
          title="Phone number"
          icon={<FaPhoneAlt />}
          value={user.cellphone}
          user={user}
        />
        <SimplePopupItem
          title="User Occupation"
          icon={<MdWork />}
          value={user.occupation}
          user={user}
        />
        <SimplePopupItem
          title="Available hours for calls"
          icon={<BiTime />}
          value={user.available}
          user={user}
        />
        <CustomPopupItem
          title="Likes/Dislikes received from other users"
          additionalClasses={[styles["centerized-flex"]]}
        >
          <BiLike />
          <Typography>{user.likes}</Typography>
          <BiDislike />
          <Typography>{user.dislikes}</Typography>
        </CustomPopupItem>
        <CustomPopupItem additionalClasses={[styles["centerized-flex"]]}>
          <Button variant="contained" color="primary" onClick={handleSeeMore}>
            More
          </Button>
        </CustomPopupItem>
        <Divider />
      </Popup>
    </Marker>
  )
}

export default UserMarker
