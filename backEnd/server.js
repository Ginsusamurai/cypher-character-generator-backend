'use strict';

const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
app.use(cors());
const PORT = process.env.PORT || 3001;
app.use(express.static('.public'));
const pg = require('pg');

// console.log(process.env.DATABASE_URL);


// app.get('/', (request, response) => {
//   console.log('1');
//   const pgClient = new pg.Client(process.env.DATABASE_URL);
//   console.log('2');
//   pgClient.connect();
//   console.log('3');
//   let query = 'SELECT descriptor_name FROM descriptorlist;';
//   pgClient.query(query)
//     .then(results => {
//       console.log('4');
//       let descriptorArray = results.rows;
//       console.log('5');
//       console.log(descriptorArray);
//       response.render('index.ejs', {descriptorArray: descriptorArray});
//       console.log('6');
//     })
//     .catch(err => {console.log('err', err);
//     });
// });


app.get('/', (request, response) => {
  const charHandlers = require('../frontEnd/js/characterSelectorHandler');
  // import getDescriptorList from '../frontEnd/js/characterSelectorHandler.js';
  console.log('char', charHandlers);
  
  Promise.all([charHandlers.getDescriptorList(), charHandlers.getTypeList(), charHandlers.getFocusList()])
    .then(val => {
      response.render('index.ejs', {descriptorArray: val[0], typeArray: val[1], focusArray: val[2]});
      console.log(val);
    });

});

app.listen(PORT, () => console.log(`listening on ${PORT}`));

