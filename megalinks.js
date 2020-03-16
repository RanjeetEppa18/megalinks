const express = require('express')
const MongoClinet = require('mongodb').MongoClient
const app = express()
const cors = require('cors')
app.use(cors()) // for cors policy - allowing other domains to access
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const url = 'mongodb://localhost:27017'
const dbName = 'megalinks'
var db
var allArchives
const port = 5000
// MONGODB CONNECTION COMMAND : /mongodb/server/4.0/bin/mongod.exe --dbpath=mongodb-data

MongoClinet.connect(
  url,
  { useUnifiedTopology: true },
  async (err, mongoClient) => {
    if (err) {
      throw new Error('Could not connect to monogoURI')
    }
    db = await mongoClient.db(dbName)

    db.collection('submissions')
      .find({})
      .sort({ score: -1 })
      .toArray((err, res) => {
        allArchives = res
      })
  }
)

app.get('/archives', function(req, res) {
  console.log('sending all archives')
  res.send(allArchives)
})

app.get('/archivecomments/:id', function(req, res) {
  var id = req.params['id']
  console.log('archive id:', id)
  MongoClinet.connect(
    url,
    { useUnifiedTopology: true },
    async (err, mongoClient) => {
      if (err) {
        throw new Error('Could not connect to monogoURI')
      }
      db = await mongoClient.db(dbName)

      db.collection('comments')
        .find({ submission: id })
        .sort({ score: -1 })
        .toArray((err, comments) => {
          res.send(comments)
        })
    }
  )
})

app.post('/saveUser', ({ body }, res, next) => {
  console.log('body:', body)
  MongoClinet.connect(
    url,
    { useUnifiedTopology: true },
    async (err, mongoClient) => {
      if (err) {
        throw new Error('Could not connect to monogoURI')
      }
      try {
        db = await mongoClient.db(dbName)
        const userExists = await db
          .collection('users')
          .findOne({ email: body.email })
        if (userExists) {
          console.log('userExists', userExists)
          throw new Error('User exists already!')
        }
        const savedUser = await db.collection('users').insertOne(body)
        res.json(savedUser.ops[0].email)
      } catch (error) {
        next(error)
      }
    }
  )
})

app.post('/login', ({ body }, res, next) => {
  MongoClinet.connect(
    url,
    { useUnifiedTopology: true },
    async (err, mongoClient) => {
      if (err) {
        throw new Error('Could not connect to monogoURI')
      }
      try {
        db = await mongoClient.db(dbName)
        logInDetails = await db.collection('users').findOne(body)
        if (logInDetails) {
          res.json(logInDetails.email)
        } else {
          throw new Error('No user exists!')
        }
      } catch (error) {
        next(error)
      }
    }
  )
})

app.get('/test', (req, res, next) => {
  // throw new Error('TEST')
  try {
    throw new Error('testing error')
  } catch (error) {
    next(error)
  }
  console.log('DONT PASTE THIS')
  // res.status(500).send('TEST 2')
})

app.listen(port, () => {
  console.log(`App listening on ${port}`)
})
