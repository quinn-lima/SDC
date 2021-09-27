var express = require('express');
//var db = require('./db');
var database = require('./database/database.js')
//var router = require('./routes/routes.js');
var controller = require('./controller.js')

const {masterRedis} = require('./redis.js')

//var morgan = require('morgan');
var parser = require('body-parser');

var app = express();
module.exports.app = app;

// Set what we are listening on.
app.set('port', 5000); // hello how are you today

// Logging and parsing
//app.use(morgan('dev'));
app.use(parser.json());

//app.get('/reviews', () => {console.log('made it')})
// Set up our routes
app.get('/master', masterRedis)

app.get('/reviews', controller.reviews)

app.get('/meta', controller.meta);

app.put('/helpful', controller.help);

app.put('/report', controller.report);

app.post('/review', controller.postReview);

if (!module.parent) {
  app.listen(app.get('port'));
  console.log('Listening on', app.get('port'));
}

module.exports = app;