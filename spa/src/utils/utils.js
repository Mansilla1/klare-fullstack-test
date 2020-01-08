export const getAuthToken = () => {
  const authToken = localStorage.getItem('authToken')
  return `Bearer ${authToken}`
}

export const getOptions = method => () => ({
  headers: {
    'Content-Type': 'application/json',
    Authorization: getAuthToken(),
  },
  credentials: 'same-origin',
  method,
})
