const { verify } = require('jsonwebtoken')
const { logConfig, logger } = require('@vtfk/logger')
const { JWT_SECRET } = require('../config')
const HTTPError = require('./http-error')

module.exports = async (context, req, next) => {
  logConfig({ azure: { context } })

  const bearerToken = req.headers.authorization
  if (!bearerToken) {
    logger('warn', ['with-jwt', 'authorization header missing'])
    return new HTTPError(400, 'Authorization header missing').toJSON()
  }

  try {
    const token = bearerToken.replace('Bearer ', '')
    verify(token, JWT_SECRET)
    logger('info', ['with-jwt', 'jwt token success'])
    return next(context, req)
  } catch (error) {
    logger('error', ['with-jwt', 'invalid jwt token', error])
    return new HTTPError(401, 'Authorization token is invalid', error).toJSON()
  }
}
