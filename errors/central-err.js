const { serverError } = require('../utils/constants')

const centralError = (err, req, res) => {
  const { statusCode = 500, message } = err
  return res.status(statusCode).send({
    message: statusCode === 500 ? serverError : message,
  })
}

module.exports = { centralError }
