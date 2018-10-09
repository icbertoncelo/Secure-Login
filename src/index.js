const express = require('express'); //used to manage routes
const bodyParser = require('body-parser');

const app = express(); // crating aplication 

app.use(bodyParser.json()); //to understand when a json request was sent
app.use(bodyParser.urlencoded({ extended: false })); //url parameters 

// refering authController
require('./controllers/authController')(app);
require('./controllers/projectController')(app);

app.listen(3000);