'use strict';

const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
app.use(cors());
const PORT = process.env.PORT || 3001;
app.use(express.static('.public'));

const fs = require('fs');
const fastcsv = require('fast-csv');

let stream = fs.createReadStream('./data/skillInfo.csv');
let csvData = [];
let csvStream = fastcsv
  .parse()
  .on("data", function(data) {
    csvData.push(data);
  })
  .on("end", function() {
    //remove header
    csvData.shift();
    let sql = "INSERT INTO skillinfo (skill_name, warrior_tier, adept_tier, explorer_tier, general_tier, skill_type, point_cost, pooly_type, description) VALUSE ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *;"
    let values = [csvData[0],csvData[1],csvData[2],csvData[3],csvData[4],csvData[5],csvData[6],csvData[7],csvData[8],csvData[9]];
    client.query(sql, values).then(datam => {console.log(datam)}));
  });

stream.pipe(csvStream);


const pg = require('pg');
const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();

client.query('SELECT table_schema, table_name FROM information_schema.tables;', (err,res) => {
  if (err) throw err;
  for (let row of res.rows){
    console.log(JSON.stringify(row));
  }
  client.end();
});


app.get('/', (request, response) => {
  response.send('hi');
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));

