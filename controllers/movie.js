const Movie = require('../models/movie')
const NotFoundError = require('../errors/not-found-err')
const CastError = require('../errors/cast-err')
const ValidationError = require('../errors/validation-err')

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
    movieId,
  } = req.body

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
    movieId,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError(
          'Проверьте правильность введеных данных',
          next
        )
      }
      err.statusCode = 500
      next(err)
    })
}

// Удаляет сохранённый фильм по _id
const deleteMovie = (req, res, next) => {
  Movie.findByIdAndRemove(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Такой карточки не существует', next)
      }

      return res.send(Movie)
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new CastError('Нет карточки с таким id', next)
      }
      err.statusCode = 500
      next(err)
    })
}

module.exports = { getMovie, addMovie, deleteMovie }
