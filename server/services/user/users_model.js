const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UserSchema = Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: false,
  },
  nickname: {
    type: String,
    required: false,
  },
})

module.exports = mongoose.model('Users', UserSchema)
