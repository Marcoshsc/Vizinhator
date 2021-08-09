import {
  Button,
  CircularProgress,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core"
import axios from "axios"
import React, { FC, useState } from "react"
import { useEffect } from "react"
import { IoLocationSharp } from "react-icons/io5"
import { useDispatch, useSelector } from "react-redux"
import { selectLocation, stopChangingLocation } from "../../store/user/actions"
import { isChangingLocation } from "../../store/user/selectors"
import { Address } from "../../store/user/types"
import styles from "./styles.module.scss"

interface AddressResponse {
  lat: number
  lon: number
  display_name: string
}

const SelectLocation: FC = () => {
  const { value } = useSelector(isChangingLocation)
  const [address, setAddress] = useState("")
  const [loading, setLoading] = useState(false)
  const [addresses, setAddresses] = useState<Address[]>([])
  const dispatch = useDispatch()

  useEffect(() => {
    setLoading(true)
    const delayDebounceFn = setTimeout(async () => {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${address}&format=json`
      )
      const newAddresses = response.data.map(
        (el: AddressResponse): Address => ({
          description: el.display_name,
          location: [el.lat, el.lon],
        })
      )
      setAddresses(newAddresses)
      setLoading(false)
    }, 3000)

    return () => clearTimeout(delayDebounceFn)
  }, [address])

  if (!value) return null

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setAddress(e.target.value)
  }

  const handleOpenLocation = (location: Address) => {
    return () => {
      dispatch(selectLocation(location))
    }
  }

  const handleSubmit = () => {
    dispatch(stopChangingLocation())
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.title}>
          <IoLocationSharp />
          <Typography>
            Type your address and select the location on the map. Press Submit
            when you are done.
          </Typography>
        </div>
        <div className={styles.textAndLoading}>
          <TextField
            placeholder="Type address"
            className={styles.textField}
            variant="outlined"
            value={address}
            onChange={handleChange}
          />
          {loading && <CircularProgress />}
          <div className={styles.locations}>
            {addresses.map((el, idx) => (
              <Tooltip key={idx} title={el.description}>
                <div
                  className={styles.locationsItem}
                  onClick={handleOpenLocation(el)}
                >
                  <Typography>{el.description}</Typography>
                </div>
              </Tooltip>
            ))}
          </div>
        </div>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          SUBMIT
        </Button>
      </div>
    </div>
  )
}

export default SelectLocation
