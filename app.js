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
const { PORT = 3000 } = process.env

mongoose.connect(process.env.DATA_BASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
})

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
