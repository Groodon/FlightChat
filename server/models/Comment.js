const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for comment
let Comment = new Schema({
  comment: {
    type: String,
    required: true
  },
  userId: {
    type: Number,
    required: true
  },
  flightId: {
    type: Number,
    required: true
  },
  tags: {
    type: [{type: String}]
  },
  date: {
    type: Date,
    default: Date.now()
  }
},{
  collection: 'comments'
});

module.exports = mongoose.model('Comment', Comment);
