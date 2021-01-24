# azf-krr

Azure function API for oppslag mot kontakt- og reservasjonsregisteret

Henter token fra maskinporten ved hjelp av [server-til-server oauth2](https://docs.digdir.no/oidc_auth_server-to-server-oauth2.html).

## API

### GET ```/lookup```

**Request**
A array with one or more personal ids.

```json
["26118642424"]
```

**Response**

```js
{
  personer: [
    {
      personidentifikator: "26118642424",
      reservasjon: "NEI",
      status: "AKTIV",
      kontaktinformasjon: {
        epostadresse: "jonas.enge@gmail.com",
        epostadresse_oppdatert: "2014-03-20T10:44:39+01",
        epostadresse_sist_verifisert: "2018-07-31T23:19:02+02",
        mobiltelefonnummer: "41514965",
        mobiltelefonnummer_oppdatert: "2014-03-20T10:44:39+01",
        mobiltelefonnummer_sist_verifisert: "2018-07-31T23:19:02+02"
      }
    }
  ]
}
```

## Azure Function

### Application settings (``local.settings.json``)

```json
{
  "IsEncrypted": false,
  "Values": {
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "AzureWebJobsStorage": "",
    "MASKINPORTEN_ISSUER": "<ISSUER/ClientId>",
    "MASKINPORTEN_CERT": "<CERT>",
    "MASKINPORTEN_PRIVATE_KEY": "<PRIVATE KEY>"
  }
}
```
