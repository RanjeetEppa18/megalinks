const Comment = require('./comment_model')
const CommentService = require('./comment_service')

module.exports = CommentService(Comment)
