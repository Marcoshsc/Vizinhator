import React, { FC } from "react"
import FirstAccessDialog from "../FirstAccessDialog"
import MapView from "../MapView"
import ProfilePage from "../ProfilePage"
import SelectLocation from "../SelectLocation"
import UserInfoDialog from "../UserInfoDialog"

const PageComponents: FC = () => {
  return (
    <>
      {/* <FirstAccessDialog /> */}
      <MapView />
      <ProfilePage />
      <SelectLocation />
      <UserInfoDialog />
    </>
  )
}

export default PageComponents
