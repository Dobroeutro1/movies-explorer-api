const mongoose = require('mongoose')
const validator = require('validator')
const { enterValidUrl } = require('../utils/constants')

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
      message: enterValidUrl,
    },
  },
  trailer: {
    required: true,
    type: String,
    validate: {
      validator: (value) => validator.isURL(value),
      message: enterValidUrl,
    },
  },
  thumbnail: {
    required: true,
    type: String,
    validate: {
      validator: (value) => validator.isURL(value),
      message: enterValidUrl,
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
  id: {
    type: Number,
  },
})

module.exports = mongoose.model('movie', movieSchema)
