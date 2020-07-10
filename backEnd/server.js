'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;
const morgan = require('morgan');
const pgClient = require('../backEnd/db.js');


//routes
const loaders = require('../backEnd/routes/optionLoaders.js');
const queryDetails = require('../backEnd/routes/queryDetails.js');

app.use(express.static("public"));
app.use(cors());
app.use(morgan('dev'));

app.use(loaders);
app.use(queryDetails);


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

