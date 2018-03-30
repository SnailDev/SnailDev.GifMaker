var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function (req, res, next) {
  request("https://gifmaker.develophelper.com/gif/category", function (error, response, body) {
    res.render('index', { title: 'Sorry 为所欲为', data: JSON.parse(body).d });
  });
});

router.get('/gifmaker', function (req, res, next) {
  var index = req.query.id;
  request("https://gifmaker.develophelper.com/gif/category", function (error, response, body) {
    res.render('gifmaker', { title: '字幕制作', data: JSON.parse(body).d[index] });
  });
});

module.exports = router;
