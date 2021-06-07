import React, { FC } from "react"
import FirstAccessDialog from "../FirstAccessDialog"
import MapView from "../MapView"
import UserInfoDialog from "../UserInfoDialog"

const PageComponents: FC = () => {
  return (
    <>
      <FirstAccessDialog />
      <MapView />
      <UserInfoDialog />
    </>
  )
}

export default PageComponents
