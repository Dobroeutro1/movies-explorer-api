const router = require('express').Router()
const movieRouter = require('./movie')
const usersRouter = require('./user')
const NotFoundError = require('../errors/not-found-err')
const resourceNotFound = require('../utils/constants')

router.use('/', usersRouter)
router.use('/', movieRouter)

router.use('*', (req, res) => {
  throw new NotFoundError(resourceNotFound)
})

module.exports = router
