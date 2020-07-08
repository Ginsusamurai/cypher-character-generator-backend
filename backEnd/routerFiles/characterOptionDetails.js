const pgClient = require('../db.js');
require('dotenv').config();


async function descriptorDetails(req,res){
  let descriptor_name = req.params.descriptor_name;
  let query = 'SELECT * FROM descriptorskills WHERE descriptor_name=$1;';
  let val = [descriptor_name];

  pgClient.query(query, val)
    .then(results => {
      let descriptor_details = results.rows;
      console.log(descriptor_details);
      res.status(200).send(descriptor_details);
    })
    .catch(err => {
      res.json(err);
    });
}

async function typeDetails(req,res){
  let type_name = req.params.type_name;
  let query = 'SELECT * FROM typeinfo WHERE type_name=$1;';

  let val = [type_name];

  pgClient.query(query, val)
    .then(results => {
      let type_info = results.rows;
      console.log(type_info);
      res.status(200).send(type_info);
    })
    .catch(err => {
      res.json(err);
    });
}

async function focusDetails(req,res){
  let focus_name = req.params.focus_name;
  console.log('focusName', focus_name);
  let query = 'SELECT * FROM focusskills WHERE focus_name=$1;';

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

module.exports.descriptorDetails = descriptorDetails;
module.exports.typeDetails = typeDetails;
module.exports.focusDetails = focusDetails; 