
const mysql = require(`mysql2/promise`);
console.log(process.env.host)
console.log(process.env.user)
console.log(process.env.password)
console.log(process.env.database)
const pool = mysql.createPool({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;

