const express = require('express');
const router = express.Router();

const optionDetails = require('../routerFiles/characterOptionDetails.js');

router.get('/descriptor/:descriptor_name', optionDetails.descriptorDetails);
router.get('/type/:type_name', optionDetails.typeDetails);
router.get('/focus/:focus_name', optionDetails.focusDetails);
router.get('/focusSkillDetails', focusSkillDetails);

module.exports = router;