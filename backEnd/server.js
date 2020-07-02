'use strict';

require('dotenv').config();

const express = require('express');
const pg = require('pg');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;
const charHandlers = require('../public/js/characterSelectorHandler');


app.use(express.static("public"));
app.use(cors());


app.get('/descriptor/:descriptor_name', descriptorDetails);
app.get('/type/:type_name', typeDetails);
app.get('/focus/:focus_name', focusDetails);
app.get('/loadSelectors', loadSelectors);

async function descriptorDetails(req,res){
  let descriptor_name = req.params.descriptor_name;
  let query = 'SELECT * FROM descriptorskills WHERE descriptor_name=$1;';

  const pgClient = new pg.Client(process.env.DATABASE_URL);
  pgClient.connect();

  let val = [descriptor_name];

  pgClient.query(query, val)
    .then(results => {
      let descriptor_details = results.rows;
      // resolve(focusNames);
      console.log(descriptor_details);
      res.status(200).send(descriptor_details);
    })
    .catch(err => {
      // reject(err);
      res.json(err);
    });
}

async function typeDetails(req,res){
  let type_name = req.params.type_name;
  let query = 'SELECT * FROM typeinfo WHERE type_name=$1;';

  const pgClient = new pg.Client(process.env.DATABASE_URL);
  pgClient.connect();

  let val = [type_name];

  pgClient.query(query, val)
    .then(results => {
      let type_info = results.rows;
      // resolve(focusNames);
      console.log(type_info);
      res.status(200).send(type_info);
    })
    .catch(err => {
      // reject(err);
      res.json(err);
    });
}

async function focusDetails(req,res){
  let focus_name = req.params.focus_name;
  console.log('focusName', focus_name);
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
      res.status(200).send(focus_info);
    })
    .catch(err => {
      // reject(err);
      res.send(err);
    });
}

async function loadSelectors(req,res){
  Promise.all([charHandlers.getDescriptorList(), charHandlers.getTypeList(), charHandlers.getFocusList()])
    .then( val => {
      res.status(200).json({ descriptorArray: val[0], typeArray: val[1], focusArray: val[2]});
    })
    .catch(e => {
      res.status(401).send('oops?')
    })

    /* data example
    {
      descriptorArray: [
                        {descriptor_name: "Appealing"},
                        {descriptor_name: "Beneficent"}
                        ],
      typeArray: [
                  {type_name: "Warrior"},
                  {type_name: "Adept"},
                  {type_name: "Explorer"},
                  {type_name: "Speaker"}
                  ],
      focusArray: [
                  {focus_name: "Abides In Stone"},
                  {focus_name: "Absorbes Energy"}
                  ]
    }
*/
}

app.get('/', (req, response) => {
  // import getDescriptorList from '../public/js/characterSelectorHandler.js';
  console.log('char', charHandlers);

  Promise.all([charHandlers.getDescriptorList(), charHandlers.getTypeList(), charHandlers.getFocusList()])
    .then(val => {
      response.render('index.ejs', {descriptorArray: val[0], typeArray: val[1], focusArray: val[2]});
      console.log(val);
    });

    
});


app.listen(PORT, () => console.log(`listening on ${PORT}`));

