/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken')
const { emailAlreadyBeenRegistered, needAuth } = require('../utils/constants')

const { NODE_ENV, JWT_SECRET } = process.env

const auth = (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(409).send({ message: needAuth })
  }

  const token = authorization.replace('Bearer ', '')

  let payload

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'
    )
  } catch (e) {
    const err = new Error(needAuth)
    err.statusCode = 401
    next(err)
  }

  req.user = payload
  next()
}

module.exports = { auth }
