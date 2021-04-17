const router = require('express').Router()
const movieRouter = require('./movie')
const usersRouter = require('./user')
const NotFoundError = require('../errors/not-found-err')

router.use('/', usersRouter)
router.use('/cards', movieRouter)
router.use('*', (req, res) => {
  throw new NotFoundError('Запрашиваемый ресурс не найден')
})

module.exports = router
