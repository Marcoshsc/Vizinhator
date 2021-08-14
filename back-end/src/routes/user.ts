import { Router } from 'express'
import { generateJwt } from '../jwt/jwt'
import { UserDTO } from '../model/user'
import {
  addUser,
  blockGivenUser,
  editUser,
  getLoggedBlockedUsers,
  getNearUsers,
  getUser,
  getUserNotifications,
  readUserNotification,
} from '../repository/generalMethods'

const userRoutes = Router()

userRoutes.post('/insert', (req, res) => {
  const user: UserDTO = req.body
  addUser(user)
    .then((savedUser) => {
      const token = generateJwt(savedUser.id as string)
      res.setHeader('authentication', token)
      res.json(savedUser)
    })
    .catch((err) => {
      console.log(err)
      res.status(400).send({ message: err.message })
    })
})

userRoutes.get('/near', (req, res, next) => {
  getNearUsers()
    .then((users) => res.status(200).json(users))
    .catch((err) => console.log(err))
})

userRoutes.get('/notifications', (req, res, next) => {
  getUserNotifications()
    .then((notifications) => res.status(200).json(notifications))
    .catch((err) => next(err))
})

userRoutes.get('/blocked', (req, res, next) => {
  getLoggedBlockedUsers()
    .then((users) => res.status(200).send(users))
    .catch((err) => next(err))
})

userRoutes.get('/notifications/:id/read', (req, res, next) => {
  const id: string = req.params.id as string
  readUserNotification(id)
    .then((user) => res.status(200).send(user))
    .catch((err) => next(err))
})

userRoutes.put('/', (req, res) => {
  const userDTO = req.body
  editUser(userDTO)
    .then((user) => {
      res.json(user)
    })
    .catch((err) => console.log(err))
})

userRoutes.get('/:id/block', (req, res, next) => {
  const id: string = req.params.id
  blockGivenUser(id)
    .then(() => res.status(200).send())
    .catch((err) => next(err))
})

userRoutes.get('/:id', (req, res) => {
  const id: string = req.params.id
  getUser(id).then((user) => {
    res.json(user)
  })
})

export default userRoutes
