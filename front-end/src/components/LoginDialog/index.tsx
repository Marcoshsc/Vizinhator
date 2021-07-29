import { Dialog } from "@material-ui/core"
import React, { FC } from "react"
import { useSelector } from "react-redux"
import { isLogin } from "../../store/user/selectors"
import SignIn from "./SignIn"

const LoginDialog: FC = () => {
  const open = useSelector(isLogin)

  return (
    <Dialog open={open}>
      <SignIn />
    </Dialog>
  )
}

export default LoginDialog
