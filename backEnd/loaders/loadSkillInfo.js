/* eslint-disable quotes */
'use strict';

function loadSkillInfo() {

  const pg = require('pg');
  const fs = require("fs");
  const fastcsv = require("fast-csv");
  const Pool = require("pg").Pool;
  require('dotenv').config({path:'../../.env'});  
  // const client = new pg.Client();
  
  
  
  // const client = new pg.Client({
  //   connectionString: process.env.DATABASE_URL,
  //   ssl: true,
  // });
  
  let stream = fs.createReadStream("../data/skillInfo.csv");
  
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
        user: process.env.SEED_USER,
        database: "cypher",
        password: process.env.DBPASS,
        port: 5432,
      });
  
      const query = "INSERT INTO skillinfo (skill_name, warrior_tier, adept_tier, explorer_tier, speaker_tier, general_tier, skill_type, point_cost, pool_type, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);";
  
  
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

module.exports = loadSkillInfo;
