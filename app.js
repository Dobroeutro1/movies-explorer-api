const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const { errors } = require('celebrate')
const router = require('./routes/router')
const { requestLogger, errorLogger } = require('./middlewares/logger')

require('dotenv').config()

const app = express()
const { PORT = 3000 } = process.env

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
})

app.use(requestLogger)

app.use(bodyParser.json())
app.use('/', router)

app.use(errorLogger)

app.use(errors())
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err
  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  })

  next()
})

app.listen(PORT)
