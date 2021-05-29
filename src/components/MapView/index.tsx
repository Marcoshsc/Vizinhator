import { FC } from "react"
import FirstAccessDialog from "../FirstAccessDialog"
import MapComponent from "../Map"
import styles from "./MapView.module.scss"

const MapView: FC<{}> = () => {
  return (
    <MapComponent
      center={[-19.686438, -43.587547]}
      zoom={13}
      className={styles.map}
      zoomControl={false}
    >
      <FirstAccessDialog />
    </MapComponent>
  )
}

export default MapView
