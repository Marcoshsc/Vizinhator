import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { json } from 'body-parser'
import { addUser } from './repository/generalMethods'
import userRoutes from './routes/user'
import authRouter from './routes/auth'
import { generateJwt, validateJwt } from './jwt/jwt'
import httpContext from 'express-http-context'

const initialize = async () => {
  const app = express()

  app.use(cors())
  app.use(json())
  app.use(httpContext.middleware)

  app.use((req, res, next) => {
    if (req.url === '/login' || req.url === '/user/insert') {
      next()
      return
    }
    try {
      const token = req.headers['authentication'] as string
      const id = validateJwt(token)
      const newJwt = generateJwt(id)
      res.setHeader('authentication', newJwt)
      httpContext.set('userId', id)
      next()
    } catch (err) {
      const newErr = new Error('Invalid authentication.')
      httpContext.set('status-code', 403)
      next(newErr)
    }
  })

  app.use('/user', userRoutes)
  app.use('/login', authRouter)

  app.use((err, req, res, next) => {
    res.status(httpContext.get('status-code')).send({ message: err.message })
  })

  mongoose.connect('mongodb://localhost:27017/vizinhator', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  app.listen(3000, () => {
    console.log('Listening on port 3000.')
  })
}

initialize()
