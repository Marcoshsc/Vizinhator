import { FC, useEffect } from "react"
import MarkerClusterGroup from "react-leaflet-markercluster"
import { useDispatch, useSelector } from "react-redux"
import {
  getLoggedUser,
  getSelectedLocation,
  getUsers,
  isChangingLocation,
} from "../../store/user/selectors"
import MapComponent from "../Map"
import UserMarker from "../UserMarker"
import styles from "./MapView.module.scss"
import { IoPersonCircleSharp } from "react-icons/io5"
import { Tooltip } from "@material-ui/core"
import { showProfile } from "../../store/user/actions"
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

  const handleOpenProfile = () => {
    dispatch(showProfile(true))
  }

  return (
    <div className={styles.container}>
      <Tooltip title="Your Profile">
        <div className={styles.profileIcon} onClick={handleOpenProfile}>
          <IoPersonCircleSharp />
        </div>
      </Tooltip>
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
