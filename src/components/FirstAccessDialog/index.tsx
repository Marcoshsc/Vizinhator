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
  const [location, setLocation] = useState("")

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setLocation(e.target.value)
  }

  return (
    <>
      <div className={styles["action-div-item"]}>
        <Typography className={styles["subtitle"]} component="h2">
          Wanna try out? It's simple:
        </Typography>
      </div>
      <div className={styles["action-div-item"]}>
        <form onSubmit={() => undefined} className={styles["action-form"]}>
          <TextField
            className={styles["action-form-input"]}
            variant="outlined"
            value={location}
            onChange={handleChange}
            placeholder="Type your Address"
          />
          <Button type="submit" variant="contained" color="primary">
            Find your neighbours
          </Button>
        </form>
      </div>
    </>
  )
}

const FirstAccessDialog: FC = () => {
  return (
    <Dialog open={true} fullWidth maxWidth="lg">
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
