require('mongoose')

const routes = require('./controllers')
const loaders = require('./loaders')
const ArchiveService = require('./services/archive')

const startServer = (App) => {
  return new Promise(async (resolve, reject) => {
    loaders(App)
    App.use('/api', routes)
    await ArchiveService.getArchives()
    resolve(true)
  })
}

module.exports = startServer
