import { Router } from 'express'
import { AuthPayload } from '../model/auth'
import { authenticateUser } from '../repository/generalMethods'

const authRouter = Router()

authRouter.get('/', (req, res) => {
  const authPayload: AuthPayload = req.body
  authenticateUser(authPayload.email, authPayload.password)
    .then((token) => {
      res.setHeader('authentication', token)
      res.status(200).send()
    })
    .catch((err) => {
      res.status(403).send({ message: err.message })
    })
})

export default authRouter
