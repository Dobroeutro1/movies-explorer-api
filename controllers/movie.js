const Movie = require('../models/movie')
const NotFoundError = require('../errors/not-found-err')
const CastError = require('../errors/cast-err')
const ValidationError = require('../errors/validation-err')
const ConflictError = require('../errors/conflict-err')
const {
  checkValidData,
  filmNotFound,
  dontDeleteFilm,
} = require('../utils/constants')

// Возвращает все сохранённые пользователем фильмы
const getMovie = (req, res, next) => {
  Movie.find({})
    .then((movie) => res.status(200).send(movie))
    .catch((err) => {
      err.statusCode = 500
      next(err)
    })
}

// Создаёт фильм
const addMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
  } = req.body
  const owner = req.user._id

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    owner,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError(checkValidData)
      }
      err.statusCode = 500
      next(err)
    })
}

// Удаляет сохранённый фильм по _id
const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw new ConflictError(dontDeleteFilm, next)
      }
      if (!movie) {
        throw new NotFoundError(filmNotFound, next)
      }

      Movie.remove(movie)
        .then((deletedMovie) => res.send(deletedMovie))
        .catch(next)
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new CastError(filmNotFound, next)
      }
      next(err)
    })
}

module.exports = { getMovie, addMovie, deleteMovie }
