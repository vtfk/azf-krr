const axios = require('axios').default

const getData = async (url, payload, token, method = 'post') => {
  const headers = { Authorization: `Bearer ${token}` }
  const { data } = await axios({
    method,
    url,
    headers,
    data: payload
  })

  return data
}

module.exports = { getData }
