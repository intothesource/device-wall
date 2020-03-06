var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var currentSite = 0;

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { websiteSrc: getUrlArray()[0] });
});

function getUrlArray() {
  MongoClient.connect('mongodb://localhost:27017/device-wall')
    .then(function (db) {
      var db = client.db('device-wall');

      db.collection('urls').find().toArray(function (err, results) {
        if (err) throw err
        return results;
      });
    })
    .catch(function (err) {})
}

module.exports = router;
