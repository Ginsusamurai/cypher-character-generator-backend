/* eslint-disable quotes */
'use strict';

function loadTypeInfo(){

  const pg = require('pg');
  const fs = require("fs");
  const fastcsv = require("fast-csv");
  const Pool = require("pg").Pool;
  
  // const client = new pg.Client();
  
  
  
  // const client = new pg.Client({
  //   connectionString: process.env.DATABASE_URL,
  //   ssl: true,
  // });
  
  let stream = fs.createReadStream("../data/typeInfo.csv");
  
  let csvData = [];
  let csvStream = fastcsv
    .parse({quote: "'"})
    .on("data", function(data) {
      csvData.push(data);
    })
    .on("end", function() {
      // remove the first line: header
      csvData.shift();
      pg.Pool
      const pool = new Pool({
        host: "localhost",
        user: "postgres",
        database: "cypher",
        password: "Multisync97f!",
        port: 5432,
      });
  
      const query = "INSERT INTO typeinfo (type_name, might, speed,intellect, extra, effort, cypher, edge, edge_limit, abilities,starting_items, weapons) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);";
  
  
      // connect to the PostgreSQL database
      // save csvData
      pool.connect((err, client, done) => {
        if (err) throw err;
        try {
          csvData.forEach(row => {
            client.query(query, row, (err, res) => {
              if (err) {
                console.log(err.stack);
              } else {
                console.log("inserted " + res.rowCount + " row:", row);
              }
            });
          });
        } finally {
          done();
        }
      });
    });
  
  stream.pipe(csvStream);
}

module.exports = loadTypeInfo;