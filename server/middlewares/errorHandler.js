export function errorHandler(err, req, res, next) {
  if (err.message) {
    return res.send(err.message)
  }
}
