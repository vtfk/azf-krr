const { readFileSync } = require('fs')

module.exports = {
  url: process.env.KOR_URL || 'https://oidc-ver1.difi.no/',
  cert: process.env.KOR_CERT ? Buffer.from(process.env.KOR_CERT, 'base64').toString() : readFileSync('./src/data/public.pem', 'utf-8'),
  privateKey: process.env.KOR_PRIVATE_KEY ? Buffer.from(process.env.KOR_PRIVATE_KEY, 'base64').toString() : readFileSync('./src/data/private.key', 'utf-8'),
  privateKeyPassphrase: process.env.KOR_PRIVATE_KEY_PASSPHRASE || undefined,
  issuer: process.env.KOR_ISSUER || 'Din-id',
  scope: process.env.KOR_SCOPE || 'global/kontaktinformasjon.read'
}
