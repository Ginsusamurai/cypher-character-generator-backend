'use strict';

const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
app.use(cors());
const PORT = process.env.PORT || 3001;
app.use(express.static('.public'));



app.get('/', (request, response) => {
  response.send('hi');
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
