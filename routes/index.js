var express = require("express");
var request = require("request");
var router = express.Router();
var path = require("path");
var app = express();

router.post("/", (req, res) => {
  var rollnumber = req.body.rollnumber;

  request(
    "http://proedge.me/test.php?rollnumber=" + rollnumber,
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.send({ result: response.body, rollnumber: req.body.rollnumber }); // Show the HTML for the Google homepage.
      } else {
        console.log(error);
      }
    }
  );
});

module.exports = router;
