import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@material-ui/core"
import React, {
  ChangeEvent,
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  editUser,
  showProfile,
  signUp,
  startChangingLocation,
} from "../../store/user/actions"
import {
  getLoggedUser,
  getSelectedLocation,
  isChangingLocation,
  isShowingProfile,
  isSignup,
} from "../../store/user/selectors"
import { FaPhoneAlt } from "react-icons/fa"
import { MdWork } from "react-icons/md"
import { BiTime } from "react-icons/bi"
import { IoMdCalendar } from "react-icons/io"
import { BsPeopleCircle } from "react-icons/bs"
import styles from "./ProfilePage.module.scss"
import { FormikHelpers, useFormik } from "formik"
import { IoLocationSharp } from "react-icons/io5"

interface ProfileItemProps {
  callbackString(value: string): void
  callbackBoolean(value: boolean): void
  label: string
  value: string
  hide: boolean
  editing: boolean
  icon: JSX.Element
}

const ProfileItem: FC<ProfileItemProps> = (
  props: PropsWithChildren<ProfileItemProps>
) => {
  const handleChangeString = (callback: (value: string) => void) => {
    return (e: ChangeEvent<HTMLInputElement>) => {
      callback(e.target.value)
    }
  }

  const handleChangeBoolean = (callback: (value: boolean) => void) => {
    return (e: ChangeEvent<HTMLInputElement>, checked: boolean) => {
      callback(checked)
    }
  }

  return (
    <div className={styles.infoDiv}>
      <div className={styles.labelDiv}>
        {props.icon}
        <Typography>{props.label}</Typography>
      </div>
      <TextField
        className={styles.textField}
        type="text"
        disabled={!props.editing}
        value={props.value}
        onChange={handleChangeString(props.callbackString)}
        variant="standard"
      />
      <div className={styles.hideDiv}>
        <Typography>Hide from not close friends</Typography>
        <Checkbox
          color="primary"
          disabled={!props.editing}
          className={styles.checkbox}
          value={props.hide}
          onChange={handleChangeBoolean(props.callbackBoolean)}
        />
      </div>
    </div>
  )
}

const ProfilePage: FC = () => {
  const loggedUser = useSelector(getLoggedUser)
  const open = useSelector(isShowingProfile)
  const { value } = useSelector(isChangingLocation)
  const signup = useSelector(isSignup)
  const [editing, setEditing] = useState(true)

  const [phone, setPhone] = useState("")
  const [hidePhone, setHidePhone] = useState(false)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [occupation, setOccupation] = useState("")
  const [hideOccupation, setHideOccupation] = useState(false)

  const [available, setAvailable] = useState("")
  const [hideAvailable, setHideAvailable] = useState(false)

  const [description, setDescription] = useState("")
  const [hideDescription, setHideDescription] = useState(false)

  const [avatarUrl, setAvatarUrl] = useState("")
  const [hideAvatarUrl, setHideAvatarUrl] = useState(false)

  const selectedLocation = useSelector(getSelectedLocation)

  const dispatch = useDispatch()

  useEffect(() => {
    setEditing(signup)
  }, [signup])

  const resetFields = useCallback(() => {
    if (!loggedUser) return
    setPhone(loggedUser.cellphone?.value || "")
    setHidePhone(loggedUser.cellphone?.hide || false)

    setEmail(loggedUser.email || "")
    setName(loggedUser.name || "")

    setOccupation(loggedUser.occupation?.value || "")
    setHideOccupation(loggedUser.occupation?.hide || false)

    setAvailable(loggedUser.available?.value || "")
    setHideAvailable(loggedUser.available?.hide || false)

    setDescription(loggedUser.description?.value || "")
    setHideDescription(loggedUser.description?.hide || false)

    setAvatarUrl(loggedUser.avatarUrl?.value || "")
    setHideAvatarUrl(loggedUser.avatarUrl?.hide || false)
  }, [loggedUser])

  useEffect(() => {
    resetFields()
  }, [resetFields])

  const handleClose = () => {
    dispatch(showProfile(false))
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    if (!loggedUser) return
    dispatch(
      editUser({
        name,
        email,
        password,
        available: {
          hide: hideAvailable,
          value: available,
        },
        position: selectedLocation
          ? selectedLocation.location
          : loggedUser.position,
        avatarUrl: {
          hide: hideAvatarUrl,
          value: avatarUrl,
        },
        cellphone: {
          hide: hidePhone,
          value: phone,
        },
        description: {
          hide: hideDescription,
          value: description,
        },
        occupation: {
          hide: hideOccupation,
          value: occupation,
        },
      })
    )
    setEditing(false)
  }

  const handleCreateProfile = () => {
    if (!selectedLocation) return
    dispatch(
      signUp({
        name,
        email,
        password,
        available: {
          hide: hideAvailable,
          value: available,
        },
        position: selectedLocation.location,
        avatarUrl: {
          hide: hideAvatarUrl,
          value: avatarUrl,
        },
        cellphone: {
          hide: hidePhone,
          value: phone,
        },
        description: {
          hide: hideDescription,
          value: description,
        },
        occupation: {
          hide: hideOccupation,
          value: occupation,
        },
      })
    )
    setEditing(false)
  }

  const handleEdit = useCallback(() => {
    if (editing) {
      resetFields()
    }
    setEditing(!editing)
  }, [editing, resetFields])

  const handleNotEdit = () => {
    setEditing(false)
    handleClose()
  }

  const handleChangeLocation = () => {
    dispatch(startChangingLocation(() => {}))
  }

  if (!loggedUser && !signup) return null

  return (
    <Dialog
      maxWidth="lg"
      fullWidth
      open={!value && open}
      onClose={handleClose}
      className={styles.dialog}
    >
      <DialogTitle>
        {loggedUser ? `${loggedUser.name}'s Profile` : `New profile creation`}
      </DialogTitle>
      <DialogContent className={styles.container}>
        <div className={styles.profileImage}>
          {avatarUrl && <img src={avatarUrl} alt="User Avatar" />}
        </div>
        <form onSubmit={handleSubmit} className={styles.infoDivContainer}>
          <div className={styles.locationDiv}>
            <div className={styles.mainItems}>
              <IoLocationSharp />
              <Typography>Location</Typography>
            </div>
            <Button
              color="primary"
              variant="contained"
              onClick={handleChangeLocation}
            >
              Change Location
            </Button>
          </div>
          <div className={styles.emailPasswordDiv}>
            <div className={styles.emailPasswordItem}>
              <Typography>Name</Typography>
              <TextField
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!editing}
                fullWidth
              />
            </div>
            <div className={styles.emailPasswordItem}>
              <Typography>Email</Typography>
              <TextField
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!editing}
                fullWidth
              />
            </div>
            {signup && (
              <div className={styles.emailPasswordItem}>
                <Typography>Password</Typography>
                <TextField
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                />
              </div>
            )}
          </div>
          <ProfileItem
            icon={<BsPeopleCircle />}
            callbackBoolean={setHideAvatarUrl}
            callbackString={setAvatarUrl}
            value={avatarUrl}
            hide={hideAvatarUrl}
            label="Avatar"
            editing={editing}
          />
          <ProfileItem
            icon={<FaPhoneAlt />}
            callbackBoolean={setHidePhone}
            callbackString={setPhone}
            value={phone}
            hide={hidePhone}
            label="Phone"
            editing={editing}
          />
          <ProfileItem
            icon={<MdWork />}
            callbackBoolean={setHideOccupation}
            callbackString={setOccupation}
            value={occupation}
            hide={hideOccupation}
            label="Occupation"
            editing={editing}
          />
          <ProfileItem
            icon={<IoMdCalendar />}
            callbackBoolean={setHideAvailable}
            callbackString={setAvailable}
            value={available}
            hide={hideAvailable}
            label="Available Hours"
            editing={editing}
          />
          <ProfileItem
            icon={<BsPeopleCircle />}
            callbackBoolean={setHideDescription}
            callbackString={setDescription}
            value={description}
            hide={hideDescription}
            label="Description"
            editing={editing}
          />
          {!signup && <Button type="submit">Submit</Button>}
        </form>
      </DialogContent>
      <DialogActions className={styles.actions}>
        {signup && (
          <Button color="primary" onClick={handleCreateProfile}>
            {"Create Profile"}
          </Button>
        )}
        {!signup && (
          <>
            <Button color="primary" onClick={handleEdit}>
              {editing ? "Cancel Edit" : "Edit Profile"}
            </Button>
            <Button color="secondary" onClick={handleNotEdit}>
              Close
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default ProfilePage
