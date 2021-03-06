const movieRouter = require('express').Router()
const { celebrate, Joi } = require('celebrate')
const validator = require('validator')
const { getMovie, addMovie, deleteMovie } = require('../controllers/movie')
const { enterValidUrl } = require('../utils/constants')

// Возвращает все сохранённые пользователем фильмы
movieRouter.get('/movies', getMovie)

/* создаёт фильм с переданными в теле
country, director, duration, year,
description, image, trailer, nameRU, nameEN и thumbnail, movieId */
movieRouter.post(
  '/movies',
  celebrate({
    body: Joi.object()
      .keys({
        country: Joi.string().required(),
        director: Joi.string().required(),
        duration: Joi.number().required(),
        year: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.string()
          .required()
          .custom((value, helper) => {
            if (validator.isURL(value)) {
              return value
            }

            return helper.message(enterValidUrl)
          }),
        trailer: Joi.string()
          .required()
          .custom((value, helper) => {
            if (validator.isURL(value)) {
              return value
            }

            return helper.message(enterValidUrl)
          }),
        thumbnail: Joi.string()
          .required()
          .custom((value, helper) => {
            if (validator.isURL(value)) {
              return value
            }

            return helper.message(enterValidUrl)
          }),
        nameRU: Joi.string().required(),
        nameEN: Joi.string().required(),
      })
      .unknown(true),
  }),
  addMovie
)

// Удаляет сохранённый фильм по _id
movieRouter.delete(
  '/movies/:movieId',
  celebrate({
    params: Joi.object().keys({
      movieId: Joi.string().hex(),
    }),
  }),
  deleteMovie
)

module.exports = movieRouter
