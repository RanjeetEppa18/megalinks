const errorHandler = require('./error_handler')
const bodyParser = require('./body_parser')

require('./mongoose')

// const env = process.env.NODE_ENV !== 'production'

module.exports = app => {
  bodyParser(app)
  // if (env) {
  //   errorHandler(app)
  // }
}
