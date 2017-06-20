var path = require('path');
var express = require('express');
var router = express.Router();
var Util = require('../lib/Util');

router.get('/index', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/html/index.html'));
    // Util.getAllData().then(dataArray => {
    //     res.render('index', {dataArray: dataArray});
    // });
});

router.get('/detail/:id', function (req, res) {
   res.sendFile(path.join(__dirname, '../public/html/detail.html'));
});

router.get('/data/:id', function (req, res) {
    res.send('hello, request for data id: ' + req.params.id);
});

router.get('/AllData', function (req, res) {
    Util.getAllData().then(dataArray => {
        res.send(dataArray);
    });
});

module.exports = router;