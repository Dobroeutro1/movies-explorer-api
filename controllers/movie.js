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
  const user = req.user._id

  Movie.find({})
    .then((movies) => {
      const userMovies = movies.filter((movie) => movie.owner === user)
      res.status(200).send(userMovies)
    })
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
    id,
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
    id,
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
  Movie.find({ id: req.params.movieId })
    .then((movie) => {
      if (movie.length < 1) {
        throw new NotFoundError(filmNotFound, next)
      }

      const filterMovie = movie.filter(
        (filterMovies) => filterMovies.owner === req.user._id
      )

      Movie.deleteOne(filterMovie[0])
        .then((deletingMovie) => {
          res.send(deletingMovie)
        })
        .catch((err) => {
          if (err.name === 'CastError') {
            throw new CastError(filmNotFound, next)
          }
          next(err)
        })
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new CastError(filmNotFound, next)
      }
      next(err)
    })
}

module.exports = { getMovie, addMovie, deleteMovie }
