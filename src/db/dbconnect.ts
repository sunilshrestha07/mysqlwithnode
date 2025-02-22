import mysql from 'mysql2/promise';

const dbconnection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'suneel',
  database: 'mysqlwithexpress',
});

export default dbconnection;
