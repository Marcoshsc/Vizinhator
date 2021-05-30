import { Button, Divider, Tooltip, Typography } from "@material-ui/core"
import L from "leaflet"
import React, { FC } from "react"
import { FaPhoneAlt } from "react-icons/fa"
import { MdWork } from "react-icons/md"
import { BiTime, BiLike, BiDislike } from "react-icons/bi"
import { IoMdCalendar } from "react-icons/io"
import { BsPeopleCircle } from "react-icons/bs"
import { Marker, Popup } from "react-leaflet"
import { User } from "../../store/user/types"
import styles from "./UserMarker.module.scss"
import "./Popup.scss"
import clsx from "clsx"

const getAvatarIcon = (
  size: number,
  avatarUrl: string = "no-avatar.png"
): L.Icon => {
  return L.icon({
    iconUrl: avatarUrl,
    iconSize: [size, size],
    iconAnchor: [0, 0],
    popupAnchor: [size / 2, size / 2],
    className: styles.marker,
  })
}

export interface UserMarkerProps {
  user: User
}

const UserMarker: FC<UserMarkerProps> = ({ user }) => {
  const iconSize = 30
  const {
    position,
    avatarUrl,
    name,
    description,
    available,
    cellphone,
    likes,
    dislikes,
    occupation,
    since,
  } = user

  const formatNumber = (n: number) => {
    return n < 10 ? `0${n}` : n.toString()
  }

  const formatDate = (date: Date | undefined): string | undefined => {
    if (!date) return undefined
    const monthDay = formatNumber(date.getDate())
    const month = formatNumber(date.getMonth() + 1)
    const year = date.getFullYear()
    return `${monthDay}/${month}/${year}`
  }

  return (
    <Marker position={position} icon={getAvatarIcon(iconSize, avatarUrl)}>
      <Popup className="user-marker-popup">
        <div className={clsx(styles["popup-item"], styles["title"])}>
          {avatarUrl && (
            <img
              className={styles["avatar"]}
              width={20}
              height={20}
              src={avatarUrl}
              alt="User Avatar"
            />
          )}
          <Typography component="h2">{name}</Typography>
        </div>
        {/* <Divider /> */}
        <Tooltip title="User description">
          <div className={styles["popup-item"]}>
            <BsPeopleCircle size={18} />
            <Typography>{description}</Typography>
          </div>
        </Tooltip>
        <Divider />
        <Tooltip title="Register time at this address">
          <div className={styles["popup-item"]}>
            <IoMdCalendar size={18} />
            <Typography>{`Since ${formatDate(since)}`}</Typography>
          </div>
        </Tooltip>
        <Divider />
        <Tooltip title="Phone number">
          <div className={styles["popup-item"]}>
            <FaPhoneAlt size={18} />
            <Typography>{cellphone}</Typography>
          </div>
        </Tooltip>
        <Divider />
        <Tooltip title="User Occupation">
          <div className={styles["popup-item"]}>
            <MdWork size={18} />
            <Typography>{occupation}</Typography>
          </div>
        </Tooltip>
        <Divider />
        <Tooltip title="Available hours for calls">
          <div className={styles["popup-item"]}>
            <BiTime size={18} />
            <Typography>{available}</Typography>
          </div>
        </Tooltip>
        <Divider />
        <Tooltip title="Likes/Dislikes received from other users">
          <div
            className={clsx(styles["popup-item"], styles["centerized-flex"])}
          >
            <BiLike size={18} />
            <Typography>{likes}</Typography>
            <BiDislike size={18} />
            <Typography>{dislikes}</Typography>
          </div>
        </Tooltip>
        <div className={clsx(styles["popup-item"], styles["centerized-flex"])}>
          <Button variant="contained" color="primary">
            More
          </Button>
        </div>
        <Divider />
      </Popup>
    </Marker>
  )
}

export default UserMarker
