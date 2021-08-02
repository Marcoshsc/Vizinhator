import { Router } from 'express'
import { UserDTO } from '../model/user'
import { addUser, editUser, getUser } from '../repository/generalMethods'

const userRoutes = Router()

userRoutes.post('/insert', (req, res) => {
  const user: UserDTO = req.body
  addUser(user)
    .then((savedUser) => {
      res.json(savedUser)
    })
    .catch((err) => {
      res.status(400).send({ message: err.message })
    })
})

userRoutes.get('/:id', (req, res) => {
  const id: string = req.params.id
  getUser(id).then((user) => {
    res.json(user)
  })
})

userRoutes.put('/:id', (req, res) => {
  const id: string = req.params.id
  const userDTO = req.body
  editUser(id, userDTO).then((user) => {
    res.json(user)
  })
})

export default userRoutes
