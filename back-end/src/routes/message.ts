import { Router } from 'express'
import { sendMessageToUser } from '../repository/generalMethods'

const messageRouter = Router()

messageRouter.post('/:userId', (req, res, next) => {
  const { content } = req.body
  const { userId } = req.params
  sendMessageToUser(userId, content)
    .then((user) => res.status(200).send(user))
    .catch((err) => next(err))
})

export default messageRouter
