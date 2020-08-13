# azf-kor

Azure function api for kontakt- og reservasjonsregisteret
Retrives token from difi with [server-to-server-oauth2](https://difi.github.io/idporten-oidc-dokumentasjon/oidc_auth_server-to-server-oauth2.html)

## API

### POST ```/GetPersonInfo```

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