import { Router } from 'express'
import {
  closeFriendUser,
  dislikeUser,
  likeUser,
} from '../repository/generalMethods'

const interactionsRouter = Router()

interactionsRouter.get('/:id/like', (req, res, next) => {
  const { id } = req.params
  likeUser(id)
    .then(() => res.status(200).send())
    .catch((err) => next(err))
})

interactionsRouter.get('/:id/dislike', (req, res, next) => {
  const { id } = req.params
  dislikeUser(id)
    .then(() => res.status(200).send())
    .catch((err) => next(err))
})

interactionsRouter.get('/:id/closefriend', (req, res, next) => {
  const { id } = req.params
  closeFriendUser(id)
    .then(() => res.status(200).send())
    .catch((err) => next(err))
})

export default interactionsRouter
