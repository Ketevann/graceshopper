'use strict'

const api = module.exports = require('express').Router()

api
  .get('/heartbeat', (req, res) => res.send({ok: true}))
  .use('/auth', require('./auth'))
  .use('/users', require('./users'))
  .use('/reviews', require('./reviews'))
  .use('/orders', require('./orders'))
  .use('/order', require('./order'))
  .use('/products', require('./products'))
  .use('/cartitem', require('./cartItem'))
  .use('/forgotPassword', require('./forgotPassword'))

// No routes matched? 404.
api.use((req, res) => res.status(404).end())
