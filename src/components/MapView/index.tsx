import { FC } from "react"
import MarkerClusterGroup from "react-leaflet-markercluster"
import { User } from "../../store/user/types"
import MapComponent from "../Map"
import UserMarker from "../UserMarker"
import styles from "./MapView.module.scss"

const MapView: FC<{}> = () => {
  const date = new Date()
  date.setDate(21)
  date.setMonth(5)
  date.setFullYear(2020)
  const users: User[] = [
    {
      avatarUrl: "https://avatars.githubusercontent.com/u/43068788?v=4",
      position: [-19.685392, -43.586517],
      available: "Afternoons",
      cellphone: "(31) 98726-4235",
      description: "I'm Alvaro, I like javascript.",
      likes: 3,
      dislikes: 4,
      name: "Álvaro Basílio",
      occupation: "Software developer",
      since: date,
    },
    {
      avatarUrl: "https://avatars.githubusercontent.com/u/52552199?v=4",
      position: [-19.685474, -43.58709],
      available: "Afternoons",
      cellphone: "(31) 98726-4235",
      description: "I'm Marcos, I like javascript, python and linux.",
      likes: 3,
      dislikes: 4,
      name: "Álvaro Basílio",
      occupation: "Software developer",
      since: date,
    },
    {
      avatarUrl:
        "https://attachments.clickup.com/profilePictures/3208401_ky9.jpg",
      position: [-19.685099, -43.586733],
      available: "Afternoons",
      cellphone: "(31) 98726-4235",
      description: "I'm Alvaro, I like javascript.",
      likes: 3,
      dislikes: 4,
      name: "Álvaro Basílio",
      occupation: "Software developer",
      since: date,
    },
    {
      avatarUrl:
        "https://conteudo.imguol.com.br/c/entretenimento/c3/2017/11/24/albert-einstein-1511565360545_v2_1513x1920.jpg",
      position: [-19.684799, -43.586559],
      available: "Afternoons",
      cellphone: "(31) 98726-4235",
      description: "I'm Alvaro, I like javascript.",
      likes: 3,
      dislikes: 4,
      name: "Álvaro Basílio",
      occupation: "Software developer",
      since: date,
    },
    {
      avatarUrl: undefined,
      position: [-19.68536, -43.586221],
      available: "Afternoons",
      cellphone: "(31) 98726-4235",
      description: "I'm Alvaro, I like javascript.",
      likes: 3,
      dislikes: 4,
      name: "Álvaro Basílio",
      occupation: "Software developer",
      since: date,
    },
  ]

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
