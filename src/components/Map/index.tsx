import { FC } from "react"
import { MapContainer, MapContainerProps, TileLayer } from "react-leaflet"

const MapComponent: FC<MapContainerProps> = (props) => {
  const { children } = props
  return (
    <MapContainer {...props}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {children}
    </MapContainer>
  )
}

export default MapComponent
