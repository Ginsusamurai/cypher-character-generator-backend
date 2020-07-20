/* eslint-disable quotes */
'use strict';

function loadAbilityInfo() {

  const pg = require('pg');
  const fs = require("fs");
  const fastcsv = require("fast-csv");
  const Pool = require("pg").Pool;
  require('dotenv').config({path:'../../.env'});  
  // const client = new pg.Client();
  
  pg.Pool
  const pool = new Pool({connectionString: process.env.DATABASE_URL});
  
  let stream = fs.createReadStream("../data/focusSkillDetail.csv");
  
  let csvData = [];
  let csvStream = fastcsv
    .parse()
    .on("data", function(data) {
      JSON.stringify(data);
      csvData.push(data);
    })
    .on('error', err => console.log('NOOOO ', err))
    .on("end", function() {
      // remove the first line: header
      csvData.shift();
      
  
      const query = "INSERT INTO focusskillsdetails (skill_name, pool, cost, action_type, feature, mechanics, description) VALUES ($1, $2, $3, $4, $5, $6, $7);";
  
  
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

module.exports = loadAbilityInfo;
