import { FC, useState } from "react"
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

const FirstAccessDialog: FC = () => {
  const [location, setLocation] = useState("")

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setLocation(e.target.value)
  }

  return (
    <Dialog open={true} fullWidth maxWidth="lg">
      <DialogTitle className={styles["dialog-title"]}>
        <div className={styles["title-div"]}>
          <AiOutlineHome color="white" size={25} />
          <Typography component="h2" className={styles.title}>
            Welcome to Vizinhator!
          </Typography>
        </div>
      </DialogTitle>
      <DialogContent>
        <div className={styles["content-div"]}>
          <div className={styles["content-div-item"]}>
            <AiOutlineSearch color="black" size={18} />
            <Typography>
              Here you can find and communicate with your neighbours in a simple
              way.
            </Typography>
          </div>
          <div className={styles["content-div-item"]}>
            <BiWorld color="black" size={18} />
            <Typography>
              See who are your neighbours, be notified when new neighbours are
              registered.
            </Typography>
          </div>
          <div className={styles["content-div-item"]}>
            <FaRegHandshake color="black" size={18} />
            <Typography>
              You can also help and be helped by your neighbours, using a
              powerful communication system.
            </Typography>
          </div>
          <div className={styles["content-div-item"]}>
            <AiOutlineEyeInvisible color="black" size={18} />
            <Typography>
              Hide your confidential information and show only for your trusted
              neighbours.
            </Typography>
          </div>
        </div>
      </DialogContent>
      <Divider />
      <DialogActions className={styles["action-div"]}>
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
      </DialogActions>
    </Dialog>
  )
}

export default FirstAccessDialog
