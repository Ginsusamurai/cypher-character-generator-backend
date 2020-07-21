const pgClient = require('../db.js');
require('dotenv').config();


async function focusSkillDetails(req,res){

  console.log('my req!', req, req.body);

  let listOfSkills = "";
  req.body.skills.forEach((skill,ind) => {
    listOfSkills += ind === 0 ? `'${skill}'` : `, '${skill}'`;
    });

  let query = `SELECT * FROM focusskillsdetails WHERE skill_name in (${listOfSkills});`;
  // let val = [descriptor_name];

  console.log(query);

  pgClient.query(query)
    .then(results => {
      let skill_details = results.rows;
      console.log(skill_details);
      res.status(200).send(skill_details);
    })
    .catch(err => {
      res.json(err);
    });
}


module.exports = focusSkillDetails;