const dotenv = require('dotenv')

dotenv.config()
const PORT = process.env.PORT
const DBPORT = process.env.DBPORT
const DBNAME = process.env.DBNAME
const DBUSER = process.env.DBUSER
const DBHOST = process.env.DBHOST
const DBPASSWORD = process.env.DBPASSWORD

module.exports = {
  PORT,
  DBPORT,
  DBNAME,
  DBUSER,
  DBHOST,
  DBPASSWORD
}
