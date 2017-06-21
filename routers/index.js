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


// api
router.post('/data/:id', function (req, res) {
    Util.getMainDataByID(req.params.id).then(mainData => {
       res.send(mainData);
    });
});
router.post('/AllData', function (req, res) {
    Util.getAllData(req.connection.user).then(dataArray => {
        res.send(dataArray);
    });
});
router.post('/username', function (req, res) {
    res.send(req.connection.user);
});

module.exports = router;