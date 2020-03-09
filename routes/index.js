var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var currentSite = 0;

/* GET home page. */
router.get('/', function (req, res, next) {
    getUrlArray().then(results => {
        console.log('RESULT: ', results);
        res.render('index', { websiteSrc: results[0] });
    });
});

function getUrlArray() {
   return new Promise((resolve, reject) => {
    MongoClient.connect('mongodb://localhost:27017/device-wall')
    .then(function (db) {
        var db = client.db('device-wall');
        console.log('UITVOERENDE CODE, PAS OP');
        db.collection('urls').find().toArray(function (err, results) {
            console.log('RESULT: ', results);
            if (err) throw err
            resolve(results);
        });
    })
    .catch(function (err) { })
   })
}

module.exports = router;
