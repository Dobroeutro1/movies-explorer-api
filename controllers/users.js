const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
// const NotFoundError = require('../errors/not-found-err')
// const CastError = require('../errors/cast-err')
const ValidationError = require('../errors/validation-err')
const ConflictError = require('../errors/conflict-err')

const createUser = async (req, res, next) => {
  const { email, password, name, about, avatar } = req.body
  bcrypt
    .hash(password, 8)
    .then((hash) =>
      User.create({
        email,
        password: hash,
        name,
        about,
        avatar,
      })
    )
    .then((user) =>
      res.send({
        email: user.email,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
      })
    )
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError(
          'Проверьте правильность введеных данных',
          next
        )
      }
      if (err.code === 11000) {
        throw new ConflictError('Такой email уже зарегистрирован', next)
      }
      err.statusCode = 500
      next(err)
    })
}

const login = (req, res, next) => {
  const { email, password } = req.body

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', {
        expiresIn: '7d',
      })

      res.send({ token })
    })
    .catch((err) => {
      err.statusCode = 401
      next(err)
    })
}

module.exports = { createUser, login }
