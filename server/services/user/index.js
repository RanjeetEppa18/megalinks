const User = require('./users_model')
const UserService = require('./users_service')

module.exports = UserService(User)
