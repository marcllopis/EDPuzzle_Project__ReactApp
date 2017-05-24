var express = require('express');
var router = express.Router();

const Media = require('../models/media');
const Question = require('../models/question');

router.get('/', (req, res, next) => {
  Media.find({}, (err, media) => {
    if (err) { return next(err) }
    Media
      .find({})
      .populate("questions.questionId")
      .exec((err, media) => {
        if (err) {
          next(err);
          return;
        }
        res.json({media});
      });
});

});








module.exports = router;
