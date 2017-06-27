var path = require('path');
var express = require('express');

var router = express.Router();
var Util = require('../lib/Util');

router.get('/index', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/html/index.html'));
});

router.get('/detail/:id', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/html/detail.html'));
});

router.get('/create', function (req, res) {
   res.sendFile(path.join(__dirname, '../public/html/create.html'));
});

// api
router.post('/data/:id', function (req, res) {
    Util.getMainDataByID(req.params.id).then(mainData => {
        if (mainData !== null && mainData.Username.toLowerCase() === String(req.connection.user).toLowerCase()) {
            res.send(mainData);
        } else {
            res.send(null);
        }
    });
});
router.post('/AllData', function (req, res) {
    let username = req.connection.user;
    Util.getAllData(username).then(dataArray => {
        res.send(dataArray);
    });
});
router.post('/username', function (req, res) {
    res.send(req.connection.user);
});
router.post('/update', function (req, res) {
    let mainData = JSON.parse(req.param('mainData'));
    if (String(req.connection.user).toLowerCase() === mainData.Username.toLowerCase()) {
        Util.updateMainData(mainData).then(status => {
            if (status === 'success') {
                console.log(status);
                res.send(status);
            }
        });
    }
});
router.post('/metaData', function (req, res) {
    let metaData = {};
    Util.getMetaData(metaData).then(metaData => {
        res.send(metaData);
    });
});
router.post('/create', function (req, res) {
    let mainData = JSON.parse(req.param('mainData'));
    if (String(req.connection.user).toLowerCase() === mainData.Username.toLowerCase()) {
        Util.saveNewMainData(mainData).then(dataID => {
            console.log(dataID);
            res.status(200).json(mainData);
        });
    }
});
router.post('/delete', function (req, res) {
    let mainData = JSON.parse(req.param('mainData'));
    console.log(mainData);
    if (String(req.connection.user).toLowerCase() === mainData.Username.toLowerCase()) {
        Util.deleteMainData(mainData).then(status => {
            console.log(status);
            res.send(status);
        });
    }
});

module.exports = router;