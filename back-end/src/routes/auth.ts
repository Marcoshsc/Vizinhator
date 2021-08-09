import { Router } from 'express'
import { AuthPayload } from '../model/auth'
import { authenticateUser } from '../repository/generalMethods'

const authRouter = Router()

authRouter.post('/', (req, res) => {
  const authPayload: AuthPayload = req.body
  authenticateUser(authPayload.email, authPayload.password)
    .then((authResponse) => {
      res.setHeader('authentication', authResponse.token)
      res.status(200).send(authResponse.user)
    })
    .catch((err) => {
      res.status(403).send({ message: err.message })
    })
})

export default authRouter
