const express = require('express');
const flightRoute = express.Router();
let Flight = require('../models/Flight');


flightRoute.route('/addTag').post((req, res) => {
  let flight = new Flight(req.body);
  flight.save().then(f => {
    res.status(200).json({"mess": "looool"});
  }).catch(err => {
    console.log(err);
    res.status(400).send("Unable to save comment");
  })
});

flightRoute.route('/all').get((req, res) => {
  Flight.find().then(flights => {
    res.status(200).send(flights);
  }).catch(err => {
    console.log(err);
    res.status(400).send("Unable to save comment");
  })
});

module.exports = flightRoute;
