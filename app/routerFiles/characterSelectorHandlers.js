'use strict';

// const pg = require('pg');
require('dotenv').config();

// console.log('terp', require('dotenv').config());
const pgClient = require('../db.js');

function getDescriptorList() {
  return new Promise((resolve, reject) => {
    let query = 'SELECT descriptor_name FROM descriptorlist;';

    pgClient.query(query)
      .then(data => {
        resolve(data.rows);
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
      
  });
}

function getTypeList() {
  return new Promise((resolve, reject) => {
    let query = 'SELECT type_name FROM typeinfo;';

    pgClient.query(query)
      .then(results => {
        let typesInfo = results.rows;
        resolve(typesInfo);
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
}

function getFocusList() {
  return new Promise((resolve, reject) => {
    let query = 'SELECT DISTINCT focus_name FROM focusskills;'

    pgClient.query(query)
      .then(results => {
        let focusNames = results.rows;
        resolve(focusNames);
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
}

module.exports.getDescriptorList = getDescriptorList;
module.exports.getTypeList = getTypeList;
module.exports.getFocusList = getFocusList;