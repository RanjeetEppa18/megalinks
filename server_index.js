const express = require('express')
const cors = require('cors')
const app = express()
const startServer = require('./server')
const port = process.env.PORT || 5000
app.use(cors())
const start = async () => {
  await startServer(app)
  // Serve only the static files form the dist directory

  app.use(express.static('./dist/megalinks'))

  app.get('*', function (req, res) {
    res.sendFile('index.html', { root: 'dist/megalinks' })
  })

  app.listen(port, () => {
    console.log(`App listening on ${port}`)
  })
}
start()
