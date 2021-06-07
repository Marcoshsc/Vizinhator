import { FC } from "react"
import MarkerClusterGroup from "react-leaflet-markercluster"
import { useSelector } from "react-redux"
import { getUsers } from "../../store/user/selectors"
import MapComponent from "../Map"
import UserMarker from "../UserMarker"
import styles from "./MapView.module.scss"

const MapView: FC<{}> = () => {
  const users = useSelector(getUsers)

  return (
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
  )
}

export default MapView
