const { readFileSync } = require('fs')

module.exports = {
  url: process.env.KRR_URL || 'https://oidc-ver1.difi.no/',
  cert: process.env.KRR_CERT ? Buffer.from(process.env.KRR_CERT, 'base64').toString() : readFileSync('./src/data/public.pem', 'utf-8'),
  privateKey: process.env.KRR_PRIVATE_KEY ? Buffer.from(process.env.KRR_PRIVATE_KEY, 'base64').toString() : readFileSync('./src/data/private.key', 'utf-8'),
  privateKeyPassphrase: process.env.KRR_PRIVATE_KEY_PASSPHRASE || undefined,
  issuer: process.env.KRR_ISSUER || 'Din-id',
  scope: process.env.KRR_SCOPE || 'global/kontaktinformasjon.read'
}
