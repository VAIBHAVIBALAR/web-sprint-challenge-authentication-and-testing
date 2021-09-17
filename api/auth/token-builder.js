const jwt = require('jsonwebtoken')

module.exports = function (user) {
  const payload = {
    subject: user.id,
    username: user.username,
  }
  const options = {
    expiresIn: '1d'
  }
  const token = jwt.sign(
    payload,
    options,
  )
  return token
}
