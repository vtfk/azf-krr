const { sign } = require('jsonwebtoken')
const { nanoid } = require('nanoid')
const { stringify } = require('querystring')
const { default: axios } = require('axios')

/**
 * Removes the first/last line from the certificate.
 * @param {string} cert Certificate that should be cleaned
 */
const cleanCert = cert => [cert.replace(/(-----(BEGIN|END) (CERTIFICATE|PRIVATE KEY)-----|\n)/g, '').replace(/\n/g, '')]

/**
 * Generates a grant that is compatible with maskinporten.
 * Docs: https://docs.digdir.no/maskinporten_protocol_jwtgrant.html
 *
 * @param {object} options
 * @param {string} options.cert Virksomhetssertifikat
 * @param {string} options.privateKey Virksomhetssertifikat private key
 * @param {string} options.audience Audience - https://maskinporten.no/ in most cases
 * @param {string} options.issuer The clientId generated in samarbeidsportalen
 */
const generateMaskinportenGrant = options => {
  if (!options) {
    throw Error('Missing required input: options')
  }
  if (!options.cert) {
    throw Error('Missing required input: options.cert')
  }
  if (!options.privateKey) {
    throw Error('Missing required input: options.privateKey')
  }
  if (!options.audience) {
    throw Error('Missing required input: options.audience')
  }
  if (!options.issuer) {
    throw Error('Missing required input: options.issuer')
  }

  const jwtOptions = {
    algorithm: 'RS256',
    audience: options.audience,
    issuer: options.issuer,
    expiresIn: 120,
    header: {
      x5c: cleanCert(options.cert)
    }
  }

  const payload = {
    scope: options.scope,
    jti: nanoid()
  }

  return sign(payload, { key: options.privateKey, passphrase: options.privateKeyPassphrase }, jwtOptions)
}

/**
 * Gets the access token from Maskinporten using the generated grant.
 *
 * @param {object} options
 * @param {object} options.url The /token url for maskinporten
 * @param {object} options.jwt The generated JWT grant from `generateMaskinportenGrant()`
 */
const getMaskinportenToken = async options => {
  if (!options) {
    throw Error('Missing required input: options')
  }
  if (!options.url) {
    throw Error('Missing required input: options.url')
  }
  if (!options.jwt) {
    throw Error('Missing required input: options.jwt')
  }

  const payload = {
    grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
    assertion: options.jwt
  }

  const httpOptions = {
    url: options.url,
    data: stringify(payload),
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    method: 'post'
  }

  try {
    const { data } = await axios(httpOptions)
    return data
  } catch (error) {
    console.log(error)
    throw error
  }
}

module.exports = {
  generateMaskinportenGrant,
  getMaskinportenToken
}
