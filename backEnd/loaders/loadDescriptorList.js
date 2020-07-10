/* eslint-disable quotes */
'use strict';

async function loadDescriptorList(){

  const pg = require('pg');
  const fs = require("fs");
  const fastcsv = require("fast-csv");
  const Pool = require("pg").Pool;
  require('dotenv').config({path:'../../.env'});

  let stream = fs.createReadStream("../data/descriptorList.csv",);
  
  pg.Pool
  const pool = new Pool({connectionString: process.env.DATABASE_URL});

  let csvData = [];
  let csvStream = fastcsv
    .parse({quote: "'"},)
    .on("data", function(data) {
      csvData.push(data);
    })
    .on("end", function() {
      // remove the first line: header
      csvData.shift();
      
  
      const query = "INSERT INTO descriptorlist (descriptor_name, descriptor_description) VALUES ($1, $2);";

      // connect to the PostgreSQL database
      // save csvData
      pool.connect((err, client, done) => {
        if (err) throw err;
        try {
          csvData.forEach(row => {
            client.query(query, row, (err, res) => {
              if (err) {
                console.log('err stack', err.stack);
              } else {
                console.log("inserted " + res.rowCount + " row:", row);
              }
            });
          });
        }catch(e){
          console.log(e);
        } finally {
        }
        
      });
      pool.end().then(() => console.log('pool closed!'));
      stream.close();
    })
    .on("close",()=>{
      return 'done';
    })
    
  
  let x = await stream.pipe(csvStream);
  // console.log(x);
  // process.exit();
}

module.exports = loadDescriptorList;
