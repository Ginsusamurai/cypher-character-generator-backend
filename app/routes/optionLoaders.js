const express = require('express');
const router = express.Router();

const charHandlers = require('../routerFiles/characterSelectorHandlers.js');

router.get("/loadSelectors", loadChararacterSelectors);

async function loadChararacterSelectors(req,res){
  Promise.all([charHandlers.getDescriptorList(), charHandlers.getTypeList(), charHandlers.getFocusList()])
    .then( async val => {
      res.status(200).json({ descriptorArray: val[0], typeArray: val[1], focusArray: val[2]});
    })
    .catch(e => {
      res.status(401).send('oops?')
    })
}

module.exports = router;