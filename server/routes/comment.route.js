const express = require('express');
const commentRoute = express.Router();
let Comment = require('../models/Comment');
const vals = require('../validators');

commentRoute.route('/post').post((req, res) => {
  let comment = new Comment(req.body);

  if (vals.validComment(comment)) {
    comment.save().then(() => {
      res.status(200).json({"message": "success"});
    })
      .catch(err => {
      console.log(err);
      res.status(400).send("Unable to save comment");
    })
  } else {
    res.status(400).send("Format of comment is wrong");
  }

});

commentRoute.route('/get/:flightId').get((req, res) => {
  Comment.find({flightId: req.params.flightId}).then(comments => {
    res.status(200).json(comments);
  });
});

module.exports = commentRoute;
