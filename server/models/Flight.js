const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for comment
let Flight = new Schema({
  flightId: {
    type: Number,
    required: true
  }
},{
  collection: 'flights'
});

module.exports = mongoose.model('Flight', Flight);
