import { StylesProvider } from "@material-ui/styles"
import React from "react"
import MapView from "./components/MapView"
import "./styles/global.scss"

function App() {
  return (
    <StylesProvider injectFirst>
      <MapView />
    </StylesProvider>
  )
}

export default App
