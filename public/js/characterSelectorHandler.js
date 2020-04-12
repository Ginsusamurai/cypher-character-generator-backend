'use strict';

const pg = require('pg');
require('dotenv').config();
// console.log('terp', require('dotenv').config());


function getDescriptorList() {

  return new Promise((resolve, reject) => {
    // console.log('nerp', process.env.DATABASE_URL);

    const pgClient = new pg.Client(process.env.DATABASE_URL);
    pgClient.connect();

    let query = 'SELECT descriptor_name FROM descriptorlist;';

    pgClient.query(query)
      .then(data => {
        // console.log(data.rows);
        resolve(data.rows);
      })
      .catch(err => {
        // console.log(err);
        reject(err);
      });
  });
}

function getTypeList() {
  return new Promise((resolve, reject) => {
    const pgClient = new pg.Client(process.env.DATABASE_URL);
    pgClient.connect();

    let query = 'SELECT type_name FROM typeinfo;';

    pgClient.query(query)
      .then(results => {
        let typesInfo = results.rows;
        // console.log('types', typesInfo);
        resolve(typesInfo);
      })
      .catch(err => {reject(err);
      });
  });
}

function getFocusList() {
  return new Promise((resolve, reject) => {
    const pgClient = new pg.Client(process.env.DATABASE_URL);
    pgClient.connect();

    let query = 'SELECT DISTINCT focus_name FROM focusskills;'

    pgClient.query(query)
      .then(results => {
        let focusNames = results.rows;
        resolve(focusNames);
      })
      .catch(err => {reject(err);
      });
  });
}

module.exports.getDescriptorList = getDescriptorList;
module.exports.getTypeList = getTypeList;
module.exports.getFocusList = getFocusList;
