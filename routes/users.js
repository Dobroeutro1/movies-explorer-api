const usersRouter = require('express').Router()
// const { celebrate, Joi } = require('celebrate')
// const validator = require('validator')
// const {
//   getUser,
//   getUsers,
//   getUsersId,
//   createUser,
//   updateAvatar,
//   updateProfile,
//   login,
// } = require('../controllers/users')
// const { auth } = require('../middlewares/auth')

// usersRouter.post(
//   '/signup',
//   celebrate({
//     body: Joi.object().keys({
//       email: Joi.string().required().email(),
//       password: Joi.string().required().min(8),
//       name: Joi.string(),
//       about: Joi.string(),
//       avatar: Joi.string().custom((value, helper) => {
//         if (validator.isUrl(value)) {
//           return value
//         }

//         return helper.message('Введите правильную ссылку')
//       }),
//     }),
//   }),
//   createUser
// )
// usersRouter.post(
//   '/signin',
//   celebrate({
//     body: Joi.object().keys({
//       email: Joi.string().required().email(),
//       password: Joi.string().required().min(8),
//     }),
//   }),
//   login
// )
// usersRouter.use(auth)
// usersRouter.get('/users', getUsers)
// usersRouter.get('/users/me', getUser)
// usersRouter.get('/users/:id', getUsersId)
// usersRouter.patch(
//   '/users/me',
//   celebrate({
//     body: Joi.object().keys({
//       name: Joi.string().required().min(2).max(30),
//       about: Joi.string().min(2).max(30),
//     }),
//   }),
//   updateProfile
// )
// usersRouter.patch(
//   '/users/me/avatar',
//   celebrate({
//     body: Joi.object().keys({
//       avatar: Joi.string()
//         .required()
//         .custom((value, helper) => {
//           if (validator.isUrl(value)) {
//             return value
//           }

//           return helper.message('Введите правильную ссылку')
//         }),
//     }),
//   }),
//   updateAvatar
// )

module.exports = usersRouter
