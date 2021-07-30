import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { json } from 'body-parser'
import { addUser } from './repository/generalMethods'
import userRoutes from './routes/user'

const initialize = async () => {
  const app = express()

  app.use(cors())
  app.use(json())
  app.use('/user', userRoutes)

  mongoose.connect('mongodb://localhost:27017/vizinhator', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  app.listen(3000, () => {
    console.log('Listening on port 3000.')
  })
}

initialize()
