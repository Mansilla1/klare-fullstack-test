const baseUrl = 'localhost:8000'

Object.defineProperty(exports, '__esModule', { value: true })

const processData = (data) => {
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}

const toJSON = (resp) => {
  let result
  if (resp.text) {
    result = resp.text().then(processData)
  } else if (resp instanceof Promise) {
    result = resp.then(processData)
  } else {
    result = Promise.resolve(resp).then(processData)
  }
  return result
}


exports.default = fetch => (url, opts) => (
  fetch(`${baseUrl}/${url}`, opts).then((resp) => {
    // Normalize IE9's response to HTTP 204 when Win error 1223.
    const status = resp.status === 1223 ? 204 : resp.status
    let response
    if (status >= 400) {
      response = toJSON(resp).then(data => Promise.reject(data))
    } else {
      response = toJSON(resp).then(data => (
        (status >= 200 && status < 300) ? data : Promise.reject(data)
      ))
    }
    return response
  })
)

module.exports = exports.default
