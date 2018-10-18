const express = require('express'); //used to manage routes
const bodyParser = require('body-parser');

const app = express(); // creating aplication 

app.use(bodyParser.json()); //to understand when a json request was sent
app.use(bodyParser.urlencoded({ extended: false })); //url parameters 

// refering authController
require('./app/controllers/index')(app);

app.listen(7000);