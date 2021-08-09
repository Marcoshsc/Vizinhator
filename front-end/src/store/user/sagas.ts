import { call, put, takeLatest } from "@redux-saga/core/effects"
import { AnyAction } from "redux"
import { editUser } from "../../services/edit"
import { fetchNeighbours } from "../../services/fetch"
import {
  closeFriendRequest,
  dislikeUser,
  likeUser,
} from "../../services/interaction"
import { signIn, SignInResponse } from "../../services/login"
import { signUp } from "../../services/signup"
import {
  signInIntern,
  signUpIntern,
  fetchNeighboursIntern,
  fetchNeighbours as fetchNeighboursAction,
  editUserIntern,
  updateNotLoggedUser,
} from "./actions"
import { User, UserActions } from "./types"

export default function* userSagas() {
  yield takeLatest(UserActions.SIGN_IN, signInSaga)
  yield takeLatest(UserActions.SIGN_UP, signUpSaga)
  yield takeLatest(UserActions.FETCH_NEIGHBOURS, fetchNeighboursSaga)
  yield takeLatest(UserActions.EDIT_USER, editUserSaga)
  yield takeLatest(UserActions.LIKE_USER, likeUserSaga)
  yield takeLatest(UserActions.DISLIKE_USER, dislikeUserSaga)
  yield takeLatest(UserActions.CLOSE_FRIEND_REQUEST, closeFriendRequestSaga)
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

function* editUserSaga(action: AnyAction) {
  try {
    const user: User = action.payload.user
    const editedUser: User = yield call(editUser, user)
    yield put(editUserIntern(editedUser))
  } catch (err) {
    console.log(err)
  }
}

function* likeUserSaga(action: AnyAction) {
  try {
    const { id } = action.payload
    const savedUser: User = yield call(likeUser, id)
    yield put(updateNotLoggedUser(id, savedUser))
  } catch (err) {
    console.log(err)
  }
}

function* dislikeUserSaga(action: AnyAction) {
  try {
    const { id } = action.payload
    const savedUser: User = yield call(dislikeUser, id)
    yield put(updateNotLoggedUser(id, savedUser))
  } catch (err) {
    console.log(err)
  }
}

function* closeFriendRequestSaga(action: AnyAction) {
  try {
    const { id } = action.payload
    const savedUser: User = yield call(closeFriendRequest, id)
    yield put(updateNotLoggedUser(id, savedUser))
  } catch (err) {
    console.log(err)
  }
}
