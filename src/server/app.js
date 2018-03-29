var config = require('./category');
var gif = require('./gifmaker');
var templates = require('./template/template');
var express = require('express');
var bodyParser = require('body-parser');
var crypto = require('crypto');
var fs = require('fs');
var app = express();

app.use(express.static('public'));
app.use(bodyParser());
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send('Hello World_1.6.1 success >.< GET');
});

app.post('/', function (req, res) {
    res.send('Hello World_1.6.1 success >.< POST');
});

app.get('/gif/category', function (req, res) {
    res.json({
        m: 0,
        d: config.CATEGRORY,
        e: ''
    });
});

app.post('/gif/make', function (req, res) {
    var tplid = req.body.tplid;
    var content = req.body.content;
    var quality = req.body.quality;

    var filename = 'cache/' + tplid + '_' + sha1(content) + '.gif';
    fs.exists('public/' + filename, function (exists) {
        if (exists) {
            res.json({
                m: 0,
                d: {
                    gifurl: 'http://gifmaker.develophelper.com/' + filename
                },
                e: ''
            });
        }
        else {
            var templObj = templates.templates[parseInt(tplid) - 1];
            var sentences = content.split('##$@?$?@$##');

            templObj.template.forEach(function (element, index) {
                element.options.text = sentences[index];
            });

            gif.makewithfilters('../template/' + templObj.hash + '.mp4', templObj.template)
                .size('75%')
                .save('public/' + filename)
                .on('end', function () {
                    res.json({
                        m: 0,
                        d: {
                            gifurl: 'http://gifmaker.develophelper.com/' + filename
                        },
                        e: ''
                    });
                });
        }
    });
});

function sha1(str) {
    var md5sum = crypto.createHash('sha1');
    md5sum.update(str, 'utf8');
    str = md5sum.digest('hex');
    return str;
}

var server = app.listen(9091, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});