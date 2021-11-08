require("dotenv").config();
const mysql = require("mysql");

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const con = mysql.createConnection({
  host: DB_HOST || "127.0.0.1",
  user: DB_USER || "root",
  password: DB_PASS,
  database: DB_NAME || "boartracker",
  multipleStatements: true
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  let sql = "DROP TABLE if exists sightings; CREATE TABLE sightings (id INT NOT NULL AUTO_INCREMENT, timestamp TIMESTAMP NOT NULL, latitude FLOAT NOT NULL, longitude FLOAT NOT NULL, adults INT NOT NULL, piglets INT NOT NULL, humanInteraction BOOLEAN NOT NULL, comments varchar(255),PRIMARY KEY (id));"
    
    con.query(sql, function(err, result) {
    if (err) throw err;
    console.log("Table creation `sightings` was successful!");

    console.log("Closing...");
  });

  con.end();
});
