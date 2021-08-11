import { FC, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { sync } from "../../store/user/actions"
import { getToken } from "../../store/user/selectors"
import BlockedUsersDialog from "../BlockedUserDialog"
import FirstAccessDialog from "../FirstAccessDialog"
import LoginDialog from "../LoginDialog"
import MapView from "../MapView"
import NotificationDialog from "../NotificationsDialog"
import ProfilePage from "../ProfilePage"
import SelectLocation from "../SelectLocation"
import UserInfoDialog from "../UserInfoDialog"

const PageComponents: FC = () => {
  const dispatch = useDispatch()
  const token = useSelector(getToken)

  useEffect(() => {
    dispatch(sync())
  }, [token, dispatch])

  return (
    <>
      <LoginDialog />
      <FirstAccessDialog />
      <NotificationDialog />
      <BlockedUsersDialog />
      <MapView />
      <ProfilePage />
      <SelectLocation />
      <UserInfoDialog />
    </>
  )
}

export default PageComponents
