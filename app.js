const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const userRoutes = require('./userRoutes')
const PORT = 8080


//server//
const server = express()
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended:true}))

// DB connection//
// Note:- Not the best practice for DB security but doesn't matter mucch as just test and will be required if running in sandbox//
const mongoURI = 'mongodb://prad:password7@ds263048.mlab.com:63048/sentry-health'
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection

db.on('error', (error) => {
    console.log('Error occured!!!')
})

db.once('open', () => {
    console.log('Connected to the database')
})

// routes//
server.get('/', (req, res) => {
    res.send('This is an API for Sentry Health test')
})
server.use('/user/', userRoutes)


// Listen on port//
server.listen(process.env.PORT || PORT, process.env.IP, ()=>{
    console.log('Server is online...')
})