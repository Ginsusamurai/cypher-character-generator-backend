'use strict';

const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
app.use(cors());
const PORT = process.env.PORT || 3001;
app.use(express.static('.public'));
const pg = require('pg');


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

app.get('/descriptor/:descriptor_name', (request, response) => {
  let descriptor_name = request.params.descriptor_name;
  let query = 'SELECT * FROM descriptorskills WHERE descriptor_name=$1;';

  const pgClient = new pg.Client(process.env.DATABASE_URL);
  pgClient.connect();

  let val = [descriptor_name];

  pgClient.query(query, val)
    .then(results => {
      let descriptor_details = results.rows;
      // resolve(focusNames);
      console.log(descriptor_details);
      response.send(descriptor_details);
    })
    .catch(err => {
      // reject(err);
      response(err);
    });


});

app.get('/type/:type_name', (request, response) => {
  let type_name = request.params.type_name;
  let query = 'SELECT * FROM typeinfo WHERE type_name=$1;';

  const pgClient = new pg.Client(process.env.DATABASE_URL);
  pgClient.connect();

  let val = [type_name];

  pgClient.query(query, val)
    .then(results => {
      let type_info = results.rows;
      // resolve(focusNames);
      console.log(type_info);
      response.send(type_info);
    })
    .catch(err => {
      // reject(err);
      response(err);
    });
});

app.get('/focus/:focus_name', (request, response) => {
  let focus_name = request.params.focus_name;
  let query = 'SELECT * FROM focusskills WHERE focus_name=$1;';

  const pgClient = new pg.Client(process.env.DATABASE_URL);
  pgClient.connect();

  let val = [focus_name];
  console.log(val);

  pgClient.query(query, val)
    .then(results => {
      let focus_info = results.rows;
      // resolve(focusNames);
      console.log(focus_info);
      response.send(focus_info);
    })
    .catch(err => {
      // reject(err);
      response.send(err);
    });
});


app.listen(PORT, () => console.log(`listening on ${PORT}`));

