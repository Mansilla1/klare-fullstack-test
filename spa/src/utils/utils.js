export const getOptions = method => () => ({
  headers: {
    'Content-Type': 'application/json',
  },
  method,
})
