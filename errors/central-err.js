const { serverError } = require('../utils/constants')

const centralError = (err, req, res) => {
  const { statusCode = 500, message } = err
  console.log('CENTRAL ERROR', err)
  console.log('500 ERROR')
  return res.status(statusCode).send({
    message: statusCode === 500 ? serverError : message,
  })
}

module.exports = { centralError }
