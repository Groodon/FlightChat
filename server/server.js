const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const Flight = require('./models/Flight.js');

const commentRoute = require('./routes/comment.route');
const flightRoute = require('./routes/flight.route');


// Database connection
let uri = 'mongodb://heroku_h4b5g9nj:5uonj9efjhacsoirr0630ql6bj@ds331758.mlab.com:31758/heroku_h4b5g9nj';
mongoose.connect(uri, { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// parse application/json
app.use(bodyParser.json());
// Server configs
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// api routes
app.use('/comment', commentRoute);
app.use('/flight', flightRoute);



var server = app.listen(3000, () => {
  var port = server.address().port;
  console.log('Example app listening at ', port)
});


