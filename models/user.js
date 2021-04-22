const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const {
  emailAlreadyBeenRegistered,
  EmailPasswordNotValid,
} = require('../utils/constants')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: emailAlreadyBeenRegistered,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
})

userSchema.statics.findUserByCredentials = function a(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error(EmailPasswordNotValid))
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error(EmailPasswordNotValid))
        }

        return user
      })
    })
}

module.exports = mongoose.model('user', userSchema)
