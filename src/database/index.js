const { pool } = require('pg')
const { DBUSER, DBHOST, DBNAME, DBPASSWORD, DBPORT } = require('../config')

export const pool = new Pool({
  port: Number(DBPORT),
  user: DBUSER,
  host: DBHOST,
  database: DBNAME,
  password: DBPASSWORD
})
