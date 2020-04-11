const mongoose = require('mongoose')
const Schema = mongoose.Schema
const CommentSchema = Schema({
  idint: {
    type: Number,
    required: true
  },
  idstr: {
    type: String,
    required: true
  },
  created: {
    type: Number,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  parent: {
    type: String,
    required: true
  },
  submission: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  subreddit: {
    type: String,
    required: true
  },
  distinguish: {
    type: String,
    required: true
  },
  textlen: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('Comments', CommentSchema)
