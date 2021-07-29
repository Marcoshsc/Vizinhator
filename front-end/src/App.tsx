import { StylesProvider } from "@material-ui/styles"
import React from "react"
import { Provider } from "react-redux"
import PageComponents from "./components/PageComponents"
import store from "./store"
import "./styles/global.scss"

function App() {
  return (
    <Provider store={store}>
      <StylesProvider injectFirst>
        <PageComponents />
      </StylesProvider>
    </Provider>
  )
}

export default App
