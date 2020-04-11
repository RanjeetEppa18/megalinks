const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ArchiveSchema = Schema({
  idint: {
    type: Number,
    default: 0,
    require: true
  },
  idstr: {
    type: String,
    default: '',
    require: true
  },
  created: {
    type: Number,
    default: 0,
    require: true
  },
  self: {
    type: Number,
    default: 0,
    require: true
  },
  nsfw: {
    type: Number,
    default: 0,
    require: true
  },
  author: {
    type: String,
    default: '',
    require: true
  },
  title: {
    type: String,
    default: '',
    require: true
  },
  url: {
    type: String,
    default: '',
    require: true
  },
  selftext: {
    type: String,
    default: '',
    require: true
  },
  score: {
    type: Number,
    default: 0,
    require: true
  },
  subreddit: {
    type: String,
    default: '',
    require: true
  },
  distinguish: {
    type: String,
    default: '',
    require: true
  },
  textlen: {
    type: Number,
    default: 0,
    require: true
  },
  num_comments: {
    type: Number,
    default: 0,
    require: true
  },
  flair_text: {
    type: String,
    default: '',
    require: true
  },
  flair_css_class: {
    type: String,
    default: '',
    require: true
  },
  augmented_at: {
    type: String,
    default: '',
    require: true
  },
  augmented_count: {
    type: String,
    default: '',
    require: true
  }
})

module.exports = mongoose.model('Submissions', ArchiveSchema)
