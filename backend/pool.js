const mysql = require(`mysql2/promise`)
const pool = mysql.createPool({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
})
module.exports = pool