const express = require('express')
const MongoClinet = require('mongodb').MongoClient;
const app = express()
const cors = require('cors');
app.use(cors()); // for cors policy - allowing other domains to access
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const url = 'mongodb://localhost:27017'
const dbName = 'megalinks'
var db;
var allArchives;

// MONGODB CONNECTION COMMAND : /mongodb/server/4.0/bin/mongod.exe --dbpath=mongodb-data

MongoClinet.connect(url, { useUnifiedTopology: true }, async (err, mongoClient) => {
    if (err) {
        throw new Error("Could not connect to monogoURI")
    }
    db = await mongoClient.db(dbName)

    db.collection('submissions').find({}).sort({ score: -1 }).toArray((err, res) => {
        allArchives = res;
    })

})

app.get('/archives', function (req, res) {
    console.log("sending all archives")
    res.send(allArchives)
})

app.get('/archivecomments/:id', function (req, res) {
    var id = req.params['id'];
    console.log("archive id:", id)
    MongoClinet.connect(url, { useUnifiedTopology: true }, async (err, mongoClient) => {
        if (err) {
            throw new Error("Could not connect to monogoURI")
        }
        db = await mongoClient.db(dbName)

        db.collection('comments').find({ submission: id }).sort({ score: -1 }).toArray((err, comments) => {
            res.send(comments);
        })

    })
})

app.post('/saveUser',({body}, res) => {

    console.log("body:", body)
    MongoClinet.connect(url, { useUnifiedTopology: true }, async (err, mongoClient) => {
        if (err) {
            throw new Error("Could not connect to monogoURI")
        }
        db = await mongoClient.db(dbName)

        const savedUser = await db.collection('users').insertOne( body);
        res.json(savedUser.ops[0].email);
    })
})

app.listen(5000, () => {
    console.log("App listening on 3000")
})
