const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const { PORT } = require('./config')
//import apiRouter from './routes'

// App Declaration
const app = express()

// Settings
app.set('port', PORT !== '' ? PORT : 3000)

// Middlewares
app.use(morgan('dev'))
app.use(cors())
app.use(express.json()) // middleware que transforma la req.body a un json

// Routes
//app.use('/', apiRouter)
app.get('/', (req, res) => res.send('Hello World!'))

// Starting the server
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'))
})
