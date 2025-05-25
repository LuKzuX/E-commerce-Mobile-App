export function errorHandler(err, req, res, next) {
  if (err.message) {
    const error = err.message.split(': ')[2]
    return res.send(error)
  }
}
