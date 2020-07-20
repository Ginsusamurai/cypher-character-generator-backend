/* eslint-disable quotes */
'use strict';

function loadFocusSkills() {


  const pg = require('pg');
  const fs = require("fs");
  const fastcsv = require("fast-csv");
  const Pool = require("pg").Pool;
  require('dotenv').config({path:'../../.env'});  
  // const client = new pg.Client();
  pg.Pool
  const pool = new Pool({connectionString: process.env.DATABASE_URL});
  
  let stream = fs.createReadStream("../data/focusSkills.csv");
  
  let csvData = [];
  let csvStream = fastcsv
    .parse()
    .on("data", function(data) {
      csvData.push(data);
    })
    .on("end", function() {
      // remove the first line: header
      csvData.shift();
      
  
      const query = "INSERT INTO focusskills (focus_name, tier, choice, focus_skill_name) VALUES ($1, $2, $3, $4);";
  
  
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

module.exports = loadFocusSkills;