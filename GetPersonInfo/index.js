const korClient = require('kor-client')
const config = require('../config')

module.exports = async function (context, req) {
  context.log(['info', 'GetPersonInfo'])
  const userPayload = req.body
  context.log(userPayload)

  if (!Array.isArray(userPayload)) {
    context.log.error(['error', 'GetPersonInfo', 'payload must be an array!'])
    context.res = { status: 400, body: { error: 'Payload must be an array!' } }
    return
  }

  const clientOptions = {
    url: config.url,
    cert: config.cert,
    privateKey: config.privateKey,
    privateKeyPassphrase: config.privateKeyPassphrase,
    issuer: config.issuer,
    scope: config.scope
  }

  try {
    const client = await korClient(clientOptions)
    const { token: { access_token: token } } = client.getConfig()
    context.log(['info', 'GetPersonInfo', 'got token'])

    const payload = { personidentifikatorer: userPayload }
    const data = await client.getData({ url: clientOptions.url + 'kontaktinfo-oauth2-server/rest/v1/personer', token, payload })
    context.log(['info', 'GetPersonInfo', 'got data'])

    context.res = { body: data }
  } catch (error) {
    context.log.error(['error', 'GetPersonInfo', error])
    context.done(error, error)
  }
}
