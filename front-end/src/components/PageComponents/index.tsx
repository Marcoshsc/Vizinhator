import React, { FC, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchNeighbours, getNotifications } from "../../store/user/actions"
import { getToken } from "../../store/user/selectors"
import FirstAccessDialog from "../FirstAccessDialog"
import LoginDialog from "../LoginDialog"
import MapView from "../MapView"
import NotificationDialog from "../NotificationsDialog"
import ProfilePage from "../ProfilePage"
import SelectLocation from "../SelectLocation"
import UserInfoDialog from "../UserInfoDialog"

const PageComponents: FC = () => {
  const token = useSelector(getToken)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!token) return
    const interval = setInterval(() => {
      dispatch(fetchNeighbours())
      dispatch(getNotifications())
    }, 15000)
    return () => {
      clearInterval(interval)
    }
  })

  useEffect(() => {
    if (token) {
      dispatch(fetchNeighbours())
      dispatch(getNotifications())
    }
  }, [token, dispatch])

  return (
    <>
      <LoginDialog />
      <FirstAccessDialog />
      <NotificationDialog />
      <MapView />
      <ProfilePage />
      <SelectLocation />
      <UserInfoDialog />
    </>
  )
}

export default PageComponents
