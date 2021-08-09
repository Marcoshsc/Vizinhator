import { FC, ReactNode, useState } from "react"
import {
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlineEyeInvisible,
} from "react-icons/ai"
import { BiWorld } from "react-icons/bi"
import { FaRegHandshake } from "react-icons/fa"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
  Typography,
} from "@material-ui/core"
import styles from "./FirstAccessDialog.module.scss"
import { isFirstAccess } from "../../store/user/selectors"
import { useDispatch, useSelector } from "react-redux"
import {
  closeFirstAccess,
  login,
  showProfile,
  signUpState,
  startChangingLocation,
} from "../../store/user/actions"

interface ContentItemProps {
  icon: ReactNode
  text: string
}

const ContentItem: FC<ContentItemProps> = (props) => {
  return (
    <div className={styles["content-div-item"]}>
      {props.icon}
      <Typography>{props.text}</Typography>
    </div>
  )
}

const Title: FC = (props) => {
  return (
    <div className={styles["title-div"]}>
      <AiOutlineHome color="white" size={25} />
      <Typography component="h2" className={styles.title}>
        Welcome to Vizinhator!
      </Typography>
    </div>
  )
}

const Actions: FC = () => {
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(signUpState(true))
    dispatch(showProfile(true))
    dispatch(startChangingLocation(() => {}))
    dispatch(closeFirstAccess())
  }

  const handleLogin = () => {
    dispatch(login(true))
    dispatch(closeFirstAccess())
  }

  return (
    <>
      <div className={styles["action-div-item"]}>
        <Button onClick={handleClick} variant="contained" color="primary">
          Sign Up and Find your neighbours - It's free!
        </Button>
      </div>
      <div className={styles["action-div-item"]}>
        <Button onClick={handleLogin} variant="contained" color="primary">
          Already have an account? Sign in now!
        </Button>
      </div>
    </>
  )
}

const FirstAccessDialog: FC = () => {
  const firstAccess = useSelector(isFirstAccess)

  return (
    <Dialog open={firstAccess} fullWidth maxWidth="lg">
      <DialogTitle className={styles["dialog-title"]}>
        <Title />
      </DialogTitle>
      <DialogContent>
        <div className={styles["content-div"]}>
          <ContentItem
            icon={<AiOutlineSearch color="black" />}
            text="Here you can find and communicate with your neighbours in a simple way."
          />
          <ContentItem
            icon={<BiWorld color="black" />}
            text="See who are your neighbours, be notified when new neighbours are registered."
          />
          <ContentItem
            icon={<FaRegHandshake color="black" />}
            text="You can also help and be helped by your neighbours, using a powerful communication system."
          />
          <ContentItem
            icon={<AiOutlineEyeInvisible color="black" />}
            text="Hide your confidential information and show only for your trusted neighbours."
          />
        </div>
      </DialogContent>
      <Divider />
      <DialogActions className={styles["action-div"]}>
        <Actions />
      </DialogActions>
    </Dialog>
  )
}

export default FirstAccessDialog
