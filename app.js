const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const { errors } = require('celebrate')
const router = require('./routes/router')
const { requestLogger, errorLogger } = require('./middlewares/logger')
const { centralError } = require('./errors/central-err')

require('dotenv').config()

const app = express()

const { PORT = 3000, NODE_ENV, DATA_BASE_URL } = process.env

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')

  next()
})

mongoose.connect(
  NODE_ENV === 'production'
    ? DATA_BASE_URL
    : 'mongodb://localhost:27017/bitfilmsdb',
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
)

app.use(helmet())

app.use(requestLogger)

app.use(bodyParser.json())
app.use('/', router)

app.use(errorLogger)

app.use(errors())
app.use((err, req, res, next) => {
  centralError(err, req, res)
  next()
})

app.listen(PORT)
