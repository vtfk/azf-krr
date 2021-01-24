const { logger, logConfig } = require('@vtfk/logger')
const { generateMaskinportenGrant, getMaskinportenToken } = require('../lib/maskinporten-token')
const { getResponseObject } = require('../lib/get-response-object')
const { getData } = require('../lib/get-data')
const HTTPError = require('../lib/http-error')

const config = require('../config')

module.exports = async function (context, { body }) {
  logConfig({ azure: { context }, prefix: 'get-person-info' })
  try {
    if (!Array.isArray(body)) throw new HTTPError(400, 'Payload must be an array!')

    const grant = generateMaskinportenGrant(config.MASKINPORTEN)
    if (!grant) throw new HTTPError(500, 'Unable to generate grant')

    const token = await getMaskinportenToken({ url: config.MASKINPORTEN.tokenUrl, jwt: grant })
    if (!token) throw new HTTPError(500, 'Unable to get token')

    const persons = await getData(config.KRR.URL, { personidentifikatorer: body }, token.access_token)
    return getResponseObject(persons)
  } catch (error) {
    logger('error', ['err', error.message])

    if (error instanceof HTTPError) return error.toJSON()
    return new HTTPError(500, 'An unknown error occured', error).toJSON()
  }
}
