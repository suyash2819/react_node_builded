var express = require("express");
var request = require("request");
var router = express.Router();
var path = require("path");
const { rejects } = require("assert");
var app = express();

router.post("/", (req, res) => {
  let rollnumbers = req.body.data;

  const promarray = rollnumbers.map((rollnumber, i) => {
    return new Promise((resolve, reject) => {
      if (isNaN(parseInt(rollnumber))) {
        return reject(rollnumber + " is not valid Roll Number");
      }
      request(
        "http://proedge.me/test.php?rollnumber=" + rollnumber,
        function (error, response, body) {
          if (!error && response.statusCode == 200) {
            return resolve({ result: response.body, rollnumber: rollnumber });
          } else {
            return reject(error);
          }
        }
      );
    });
  });

  Promise.allSettled(promarray)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
