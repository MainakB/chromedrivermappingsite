var express = require("express");
const request = require("request");
var router = express.Router();

router.get("/", function (req, res, next) {
  request(
    { url: "http://storage.googleapis.com/chromedriver/" },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: "error", message: err.message });
      }
      res.send(response);
    }
  );
});

module.exports = router;
