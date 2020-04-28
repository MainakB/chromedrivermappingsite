var express = require("express");
const request = require("request");
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get("/", function (req, res, next) {
  res.send("API is working properly");
});

module.exports = router;
