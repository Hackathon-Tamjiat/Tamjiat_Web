'use strict';
const mysql = require("mysql");

require('dotenv').config({ path : ".env" });
const db = mysql.createConnection({
  host: process.env.DB_host,
  port: process.env.DB_port,
  user: process.env.DB_user,
  password: process.env.DB_password,
  database: process.env.DB_database,

  dateStrings: true
})
const h_db = mysql.createConnection({
  host: process.env.Haeri_DB_host,
  port: process.env.Haeri_DB_port,
  user: process.env.Haeri_DB_user,
  password: process.env.Haeri_DB_password,
  database: process.env.Haeri_DB_database,

  dateStrings: true
})

handleDisconnect(db);
handleDisconnect(h_db);

function handleDisconnect(client){
    client.on('error', function (error) {
       if(!error.fatal) return;
       if (error.code !== 'PROTOCOL_CONNECTION_LOST') throw err;

        console.error('> Re-connecting lost MySQL connection: ' + error.stack);

        db = mysql.createConnection(client.config);
        handleDisconnect(db);
        db.connect();
    });
};

module.exports =  db;