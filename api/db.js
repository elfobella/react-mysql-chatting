import mysql from "mysql";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "183904678y",
  database: "agafitol",
});

export default db;
