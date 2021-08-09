import { applyMiddleware, createStore } from "redux"
import createSagaMiddleware from "redux-saga"
import rootReducer from "./rootReducer"
import rootSagas from "./rootSagas"

const sagaMiddleWare = createSagaMiddleware()
const store = createStore(rootReducer, applyMiddleware(sagaMiddleWare))

sagaMiddleWare.run(rootSagas)

export default store
