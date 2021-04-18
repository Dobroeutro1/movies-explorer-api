const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const NotFoundError = require('../errors/not-found-err')
const CastError = require('../errors/cast-err')
const ValidationError = require('../errors/validation-err')
const ConflictError = require('../errors/conflict-err')

// Регистрация пользователя
const createUser = async (req, res, next) => {
  const { email, password, name } = req.body
  bcrypt
    .hash(password, 8)
    .then((hash) =>
      User.create({
        email,
        password: hash,
        name,
      })
    )
    .then((user) =>
      res.send({
        email: user.email,
        name: user.name,
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

// Логин пользователя
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

// Возвращает информацию о пользователе (email и имя)
const getUser = (req, res, next) => {
  const { _id } = req.user
  User.findOne({ _id })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id', next)
      }

      return res.status(200).send({ email: user.email, name: user.name })
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new CastError('Передан не валидный id', next)
      }
      err.statusCode = 500
      next(err)
    })
}

// Обновляет информацию о пользователе (email и имя)
const updateUser = (req, res, next) => {
  const { email, name } = req.body
  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден', next)
      }
      return res.send({ email: user.email, name: user.name })
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError(
          'Проверьте правильность введеных данных',
          next
        )
      }
      if (err.name === 'CastError') {
        throw new CastError('Передан не валидный id', next)
      }
      err.statusCode = 500
      next(err)
    })
}

module.exports = { createUser, login, getUser, updateUser }