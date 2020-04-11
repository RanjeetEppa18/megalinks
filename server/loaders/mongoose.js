const mongoose = require('mongoose')
const mongoDB = process.env.mongodbUri || 'mongodb://localhost:27017'
mongoose.connect(mongoDB, {
  dbName: 'megalinks',
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
console.log('CONNECTED')
