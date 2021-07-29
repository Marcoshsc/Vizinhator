import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { addUser } from './repository/generalMethods'

const initialize = async () => {
  const app = express()

  app.use(cors())

  mongoose.connect('mongodb://localhost:27017/vizinhator', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  app.get('/', (req, res) => {
    res.json({
      message: 'Working',
    })
  })

  const user = await addUser({
    location: {
      type: 'Point',
      coordinates: [1, 2],
    },
    name: 'Marcos',
    cellphone: {
      value: 'Cellphone',
      hide: false,
    },
    occupation: {
      value: 'occupation',
      hide: true,
    },
    avatarUrl: {
      value: 'url',
      hide: false,
    },
    available: {
      value: 'available',
      hide: true,
    },
    description: {
      value: 'descripton',
      hide: false,
    },
  })
  console.log(user)
  // position: {
  //   type: 'Point',
  //   coordinates: [1, 2],
  // },
  // name: 'Marcos',
  // cellphone: {
  //   value: 'Cellphone',
  //   hide: false,
  // },
  // occupation: {
  //   value: 'occupation',
  //   hide: true,
  // },
  // avatarUrl: {
  //   value: 'url',
  //   hide: false,
  // },
  // description: {
  //   value: 'descripton',
  //   hide: false,
  // },
  // since: new Date(),
  // closeFriendsIds: [],
  // likedBy: [],
  // dislikedBy: [],
  // messages: [],

  app.listen(3000, () => {
    console.log('Listening on port 3000.')
  })
}

initialize()
