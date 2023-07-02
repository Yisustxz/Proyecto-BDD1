const { Pool } = require('pg')
const { DBUSER, DBHOST, DBNAME, DBPASSWORD, DBPORT } = require('../config')

const pool = new Pool({
  port: Number(DBPORT),
  user: DBUSER,
  host: DBHOST,
  database: DBNAME,
  password: DBPASSWORD
})

module.exports = {
  pool
}
