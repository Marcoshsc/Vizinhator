import {
  call,
  cancel,
  delay,
  fork,
  put,
  select,
  takeLatest,
} from "@redux-saga/core/effects"
import { AnyAction } from "redux"
import { take } from "redux-saga/effects"
import { editUser } from "../../services/edit"
import { fetchNeighbours } from "../../services/fetch"
import {
  blockUser,
  closeFriendRequest,
  dislikeUser,
  getBlockedUsers,
  likeUser,
} from "../../services/interaction"
import { signIn, SignInResponse } from "../../services/login"
import { sendMessage } from "../../services/message"
import {
  fetchNotifications,
  readNotification,
} from "../../services/notifications"
import { signUp } from "../../services/signup"
import {
  signInIntern,
  signUpIntern,
  fetchNeighboursIntern,
  editUserIntern,
  updateNotLoggedUser,
  getNotificationsIntern,
  fetchNeighbours as fetchNeighboursAction,
  getNotifications as getNotificationsAction,
  getBlockedUsers as getBlockedUsersAction,
  getBlockedUsersIntern,
  stopSync,
  sync,
} from "./actions"
import { getToken } from "./selectors"
import { BlockedUser, Message, User, UserActions } from "./types"

export default function* userSagas() {
  yield takeLatest(UserActions.SIGN_IN, signInSaga)
  yield takeLatest(UserActions.SIGN_UP, signUpSaga)
  yield takeLatest(UserActions.FETCH_NEIGHBOURS, fetchNeighboursSaga)
  yield takeLatest(UserActions.EDIT_USER, editUserSaga)
  yield takeLatest(UserActions.LIKE_USER, likeUserSaga)
  yield takeLatest(UserActions.DISLIKE_USER, dislikeUserSaga)
  yield takeLatest(UserActions.CLOSE_FRIEND_REQUEST, closeFriendRequestSaga)
  yield takeLatest(UserActions.SEND_MESSAGE, sendMessageSaga)
  yield takeLatest(UserActions.GET_NOTIFICATIONS, getNotificationsSaga)
  yield takeLatest(UserActions.READ_NOTIFICATION, readNotificationSaga)
  yield takeLatest(UserActions.BLOCK_USER, blockUserSaga)
  yield takeLatest(UserActions.GET_BLOCKED_USERS, getBlockedUsersSaga)
  yield takeLatest(UserActions.SYNC, syncSaga)
}

function* syncSaga() {
  const syncTask = yield fork(fetchObjects)
  yield take(UserActions.STOP_SYNC)
  yield cancel(syncTask)
}

function* fetchObjects() {
  try {
    while (true) {
      const token = yield select(getToken)
      if (token) {
        yield put(fetchNeighboursAction())
        yield put(getNotificationsAction())
        yield put(getBlockedUsersAction())
      }
      yield delay(15000)
    }
  } finally {
  }
}

function* signInSaga(action: AnyAction) {
  try {
    const { email, password } = action.payload
    const signInResponse: SignInResponse = yield call(signIn, email, password)
    yield put(signInIntern(signInResponse.token, signInResponse.user))
  } catch (err) {
    console.log(err)
  }
}

function* signUpSaga(action: AnyAction) {
  try {
    const { data } = action.payload
    const signUpResponse: SignInResponse = yield call(signUp, data)
    yield put(signUpIntern(signUpResponse.token, signUpResponse.user))
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

function* sendMessageSaga(action: AnyAction) {
  try {
    const user: User = action.payload.user
    const message: Message = action.payload.message
    const updatedUser: User = yield call(
      sendMessage,
      user.id as string,
      message.body
    )
    yield put(updateNotLoggedUser(user.id as string, updatedUser))
  } catch (err) {
    console.log(err)
  }
}

function* getNotificationsSaga() {
  try {
    const notifications: Notification[] = yield call(fetchNotifications)
    yield put(getNotificationsIntern(notifications))
  } catch (err) {
    console.log(err)
  }
}

function* readNotificationSaga(action: AnyAction) {
  try {
    const id: string = action.payload.id
    const notifications: Notification[] = yield call(readNotification, id)
    yield put(getNotificationsIntern(notifications))
  } catch (err) {
    console.log(err)
  }
}

function* blockUserSaga(action: AnyAction) {
  try {
    yield put(stopSync())
    const id: string = action.payload.id
    yield call(blockUser, id)
    yield put(sync())
  } catch (err) {
    console.log(err)
  }
}

function* getBlockedUsersSaga() {
  try {
    const users: BlockedUser[] = yield call(getBlockedUsers)
    yield put(getBlockedUsersIntern(users))
  } catch (err) {
    console.log(err)
  }
}
