const userRouter = require('express').Router()
const { celebrate, Joi } = require('celebrate')
const {
  createUser,
  login,
  getUser,
  updateUser,
} = require('../controllers/user')
const { auth } = require('../middlewares/auth')

// Роут регистрации
userRouter.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
      name: Joi.string(),
    }),
  }),
  createUser
)

// Роут логина
userRouter.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login
)

// Аутентификация
userRouter.use(auth)

// Возвращает информацию о пользователе (email и имя)
userRouter.get('/users/me', getUser)

// Обновляет информацию о пользователе (email и имя)
userRouter.patch(
  '/users/me',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      name: Joi.string().required().min(2).max(30),
    }),
  }),
  updateUser
)

module.exports = userRouter
