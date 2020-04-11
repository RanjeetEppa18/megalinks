const errorHandler = require('errorhandler')

module.exports = app => {
  app.use(errorHandler())
}
