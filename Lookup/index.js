const { logger } = require('@vtfk/logger')
const { generateMaskinportenGrant, getMaskinportenToken } = require('../lib/maskinporten-token')
const { getResponseObject } = require('../lib/get-response-object')
const { getData } = require('../lib/get-data')
const HTTPError = require('../lib/http-error')
const withJwt = require('../lib/with-jwt')

const config = require('../config')

const lookup = async function (context, { body }) {
  try {
    if (!Array.isArray(body)) throw new HTTPError(400, 'Payload must be an array!')

    const grant = generateMaskinportenGrant(config.MASKINPORTEN)
    if (!grant) throw new HTTPError(500, 'Unable to generate grant')

    const token = await getMaskinportenToken({ url: config.MASKINPORTEN.tokenUrl, jwt: grant })
    if (!token) throw new HTTPError(500, 'Unable to get token')

    const persons = await getData(config.KRR.URL, { personidentifikatorer: body }, token.access_token)
    logger('info', ['lookup', 'returning persons', persons.personer ? persons.personer.length : 0])

    return getResponseObject(persons)
  } catch (error) {
    logger('error', ['lookup', 'err', error.message])

    if (error instanceof HTTPError) return error.toJSON()
    return new HTTPError(500, 'An unknown error occured', error).toJSON()
  }
}

module.exports = (context, req) => withJwt(context, req, lookup)
