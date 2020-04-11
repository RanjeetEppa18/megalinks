const express = require('express')
const cors = require('cors')
require('mongoose')

const app = express()
app.use(cors()) // for cors policy - allowing other domains to access

const routes = require('./controllers')
const loaders = require('./loaders')
const ArchiveService = require('./services/archive')
const port = process.env.PORT || 5000
const start = async () => {
  loaders(app)

  app.use(routes)
  await ArchiveService.getArchives()
  // app.use(bodyParser)

  app.listen(port, () => {
    console.log(`App listening on ${port}`)
  })
  // consola.ready({
  //   message: `Server listening on http://${host}:${port}`,
  //   badge: true
  // })
}
start()
