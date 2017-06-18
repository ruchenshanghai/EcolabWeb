var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var app = express();


var indexRouter = require('./routers/index');
var config = require('./config/default');
var MainData = require('./model/MainData');
var Util = require('./lib/Util');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

app.use('/', indexRouter);
// 404 page
app.use(function (req, res) {
    if (!res.headersSent) {
        res.redirect('/AllData');
    }
});

let testData = new MainData();
console.log(testData.BUDistrictID);

// MainData.test();
Util.resolveMainData(testData, function (err) {
    if (err) {
        console.log(err);
    } else {
        testData.Province = '北京';
        Util.updataMainData(testData, function (err) {
            if (!err) {
                console.log('no error');
            }
        })
    }
});






app.listen(config.port);