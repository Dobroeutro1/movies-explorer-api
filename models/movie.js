const mongoose = require('mongoose')
const validator = require('validator')

const movieSchema = new mongoose.Schema({
  country: {
    required: true,
    type: String,
  },
  director: {
    required: true,
    type: String,
  },
  duration: {
    required: true,
    type: Number,
  },
  year: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  image: {
    required: true,
    type: String,
    validate: {
      validator: (value) => validator.isURL(value),
      message: 'Введите правильную ссылку!',
    },
  },
  trailer: {
    required: true,
    type: String,
    validate: {
      validator: (value) => validator.isURL(value),
      message: 'Введите правильную ссылку!',
    },
  },
  thumbnail: {
    required: true,
    type: String,
    validate: {
      validator: (value) => validator.isURL(value),
      message: 'Введите правильную ссылку!',
    },
  },
  nameRU: {
    required: true,
    type: String,
  },
  nameEN: {
    required: true,
    type: String,
  },
  owner: {
    required: true,
    type: Object,
  },
})

module.exports = mongoose.model('movie', movieSchema)
