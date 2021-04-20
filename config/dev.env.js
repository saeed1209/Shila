'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  VUE_APP_BASE_URL: '"http://localhost:8002/api/v1/"',
  STRIPE_TOKEN: '"YOUR_TOKEN"'
})

