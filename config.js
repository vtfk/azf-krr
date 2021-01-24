const { readFileSync } = require('fs')

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || 'Very secret secret indeed',
  KRR: {
    URL: process.env.KRR_URL || 'https://krr.digdir.no/rest/v1/personer'
  },
  MASKINPORTEN: {
    tokenUrl: process.env.MASKINPORTEN_TOKEN_URL || 'https://maskinporten.no/token',
    audience: process.env.MASKINPORTEN_AUDIENCE || 'https://maskinporten.no/',
    cert: process.env.MASKINPORTEN_CERT ? Buffer.from(process.env.KRR_CERT, 'base64').toString() : readFileSync('./data/public.pem', 'utf-8'),
    privateKey: process.env.MASKINPORTEN_PRIVATE_KEY ? Buffer.from(process.env.KRR_PRIVATE_KEY, 'base64').toString() : readFileSync('./data/private.key', 'utf-8'),
    issuer: process.env.MASKINPORTEN_ISSUER || '00000000-0000-0000-0000-000000000000',
    scope: process.env.MASKINPORTEN_SCOPE || 'krr:global/kontaktinformasjon.read'
  }
}
