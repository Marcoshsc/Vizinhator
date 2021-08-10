import { FC, useEffect } from "react"
import MarkerClusterGroup from "react-leaflet-markercluster"
import { useDispatch, useSelector } from "react-redux"
import {
  getLoggedUser,
  getNotifications,
  getSelectedLocation,
  getUsers,
  isChangingLocation,
} from "../../store/user/selectors"
import MapComponent from "../Map"
import UserMarker from "../UserMarker"
import styles from "./MapView.module.scss"
import { IoNotificationsSharp, IoPersonCircleSharp } from "react-icons/io5"
import { ImExit } from "react-icons/im"
import { Tooltip, Typography } from "@material-ui/core"
import {
  logout,
  showNotifications,
  showProfile,
} from "../../store/user/actions"
import { Marker, useMap } from "react-leaflet"

const MapElements: FC = () => {
  const changingLocation = useSelector(isChangingLocation)
  const users = useSelector(getUsers)
  const selectedLocation = useSelector(getSelectedLocation)
  const map = useMap()
  const loggedUser = useSelector(getLoggedUser)

  useEffect(() => {
    if (!selectedLocation) return
    console.log("got here")
    map.flyTo({
      lat: selectedLocation.location[0],
      lng: selectedLocation.location[1],
    })
  }, [selectedLocation, map])

  useEffect(() => {
    if (loggedUser) {
      map.flyTo({
        lat: loggedUser.position[0],
        lng: loggedUser.position[1],
      })
    }
  }, [loggedUser, map])

  return (
    <>
      {!changingLocation.value && (
        <MarkerClusterGroup>
          {users.map((el, idx) => (
            <UserMarker key={idx} user={el} />
          ))}
        </MarkerClusterGroup>
      )}
      {changingLocation.value && selectedLocation && (
        <Marker position={selectedLocation.location}></Marker>
      )}
    </>
  )
}

const MapView: FC<{}> = () => {
  const dispatch = useDispatch()
  const notifications = useSelector(getNotifications)

  const handleOpenProfile = () => {
    dispatch(showProfile(true))
  }

  const handleOpenNotifications = () => {
    dispatch(showNotifications(true))
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div className={styles.container}>
      <div className={styles.actions}>
        <Tooltip title="Your Profile">
          <div className={styles.profileIcon} onClick={handleOpenProfile}>
            <IoPersonCircleSharp />
          </div>
        </Tooltip>
        <Tooltip title="See notifications">
          <div className={styles.profileIcon} onClick={handleOpenNotifications}>
            <IoNotificationsSharp />
            {!!notifications.length && (
              <div className={styles.centerized}>
                <Typography align="center">{`${notifications.length}`}</Typography>
              </div>
            )}
          </div>
        </Tooltip>
        <Tooltip title="Logout">
          <div className={styles.profileIcon} onClick={handleLogout}>
            <ImExit />
          </div>
        </Tooltip>
      </div>
      <MapComponent
        center={[-19.686438, -43.587547]}
        zoom={13}
        className={styles.map}
        zoomControl={false}
      >
        <MapElements />
      </MapComponent>
    </div>
  )
}

export default MapView
