import { call, put, takeLatest } from "@redux-saga/core/effects"
import { AnyAction } from "redux"
import { fetchNeighbours } from "../../services/fetch"
import { signIn, SignInResponse } from "../../services/login"
import { signUp } from "../../services/signup"
import {
  signInIntern,
  signUpIntern,
  fetchNeighboursIntern,
  fetchNeighbours as fetchNeighboursAction,
} from "./actions"
import { User, UserActions } from "./types"

export default function* userSagas() {
  yield takeLatest(UserActions.SIGN_IN, signInSaga)
  yield takeLatest(UserActions.SIGN_UP, signUpSaga)
  yield takeLatest(UserActions.FETCH_NEIGHBOURS, fetchNeighboursSaga)
}

function* signInSaga(action: AnyAction) {
  try {
    const { email, password } = action.payload
    const signInResponse: SignInResponse = yield call(signIn, email, password)
    yield put(signInIntern(signInResponse.token, signInResponse.user))
    yield put(fetchNeighboursAction())
  } catch (err) {
    console.log(err)
  }
}

function* signUpSaga(action: AnyAction) {
  try {
    const { data } = action.payload
    const signUpResponse: SignInResponse = yield call(signUp, data)
    yield put(signUpIntern(signUpResponse.token, signUpResponse.user))
    yield put(fetchNeighboursAction())
  } catch (err) {
    console.log(err)
  }
}

function* fetchNeighboursSaga() {
  try {
    const neighbours: User[] = yield call(fetchNeighbours)
    yield put(fetchNeighboursIntern(neighbours))
  } catch (err) {
    console.log(err)
  }
}
