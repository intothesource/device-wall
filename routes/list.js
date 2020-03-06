var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var router = express.Router();
var bodyParser = require('body-parser');
var testVar = 'testVar';

/* GET list page. */
router.get('/', function(req, res, next) {
  MongoClient.connect('mongodb://localhost:27017/device-wall', function (err, client) {
  if (err) throw err

  var db = client.db('device-wall');

  db.collection('urls').find().toArray(function (err, results) {
    if (err) throw err

    res.render('list', { results });
    console.log(results)
  })
});
});

router.post('/', function(req, res, next) {

  console.log(req.body);
  var newUrl = null;
  try {
    new URL(req.body.url);
    newUrl = req.body.url;
    if (newUrl) {
      MongoClient.connect('mongodb://localhost:27017/device-wall', function (err, client) {
        if (err) throw err
      
        var db = client.db('device-wall')

        db.collection('urls').find().toArray(function (err, results) {
          var foundDuplicateUrl = false;
          for (var existingUrlId = 0; existingUrlId > results.length; existingUrlId++) {
            console.log('help');
            console.log('Comparing: ', results[existingUrlId], ' and ', newUrl, ' the comparison is ', newUrl === results[existingUrlId]);
            if (newUrl === results[existingUrlId].url) {
              foundDuplicateUrl = true;
            }
          }
          if (foundDuplicateUrl) {
            res.status(400).send("Duplicate url");
          } else {
            db.collection('urls').insertOne({
              url: `${newUrl}`,
            });
              if (err) throw err

            res.status(200).send('Added url to list');
          }
        });
        });
    }
  } catch (_) {
    res.status(400).send("Can't recognize url");
  }
});

module.exports = router;
