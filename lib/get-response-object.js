const getResponseObject = (data, status = 200) => {
  return {
    status,
    headers: {
      'Content-Type': 'application/json'
    },
    body: data
  }
}

module.exports = { getResponseObject }
