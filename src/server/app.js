var gif = require('./gifmaker');
var util = require('./util');
var reload = require('auto-reload');;
var config = reload('./data/category');
var templates = reload('./data/template');
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();

app.use(express.static('public'));
//app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.get('/', function (req, res) {
    res.send('Hello World_1.6.1 success >.< GET');
});

app.post('/', function (req, res) {
    res.send('Hello World_1.6.1 success >.< POST');
});

app.post("/pageviews", function (req, res) {
    var host = req.body.host;
    var urls = req.body['urls[]'];

    fs.readFile('./data/blogpageviews.json', function (err, data) {
        if (err) {
            console.error(err);
        }
        var pageviews = data.toString();
        pageviews = JSON.parse(pageviews);
        //把数据读出来,然后进行修改
        for (var i = 0; i < urls.length; i++) {
            if (pageviews['pageviews'].hasOwnProperty(urls[i])) {
                pageviews['pageviews'][urls[i]] = pageviews['pageviews'][urls[i]] + 1;
            } else {
                pageviews['pageviews'][urls[i]] = 1;
            }
            pageviews['pageviews']['/'] = pageviews['pageviews']['/'] + 1;
        }

        var str = JSON.stringify(pageviews);
        //console.log(str);
        fs.writeFile('./data/blogpageviews.json', str, function (err) {
            if (err) {
                console.error(err);
            }
            console.log('--------------------修改成功');

            res.json(pageviews);
        })
    })

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

    var filename = 'cache/' + tplid + '_' + util.sha1(content) + '.gif';
    fs.exists('public/' + filename, function (exists) {
        if (exists) {
            res.json({
                m: 0,
                d: {
                    gifurl: util.SERVER + filename
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

            gif.makewithfilters('../data/template/' + templObj.hash + '.mp4', templObj.template)
                .size('75%')
                .save('public/' + filename)
                .on('end', function () {
                    res.json({
                        m: 0,
                        d: {
                            gifurl: util.SERVER + filename
                        },
                        e: ''
                    });
                });
        }
    });
});

var server = app.listen(9091, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});