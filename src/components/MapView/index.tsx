import { FC } from "react"
import MarkerClusterGroup from "react-leaflet-markercluster"
import { useDispatch, useSelector } from "react-redux"
import { getUsers } from "../../store/user/selectors"
import MapComponent from "../Map"
import UserMarker from "../UserMarker"
import styles from "./MapView.module.scss"
import { IoPersonCircleSharp } from "react-icons/io5"
import { Tooltip } from "@material-ui/core"
import { showProfile } from "../../store/user/actions"

const MapView: FC<{}> = () => {
  const users = useSelector(getUsers)
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
        <MarkerClusterGroup>
          {users.map((el, idx) => (
            <UserMarker key={idx} user={el} />
          ))}
        </MarkerClusterGroup>
      </MapComponent>
    </div>
  )
}

export default MapView
