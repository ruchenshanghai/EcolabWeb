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

router.get('/create', function (req, res) {
   res.sendFile(path.join(__dirname, '../public/html/create.html'));
});

// api
router.post('/data/:id', function (req, res) {
    Util.getMainDataByID(req.params.id).then(mainData => {
        res.send(mainData);
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
    if (mainData.CompetitorCNID === 0 && mainData.NewCompetitorCN !== '') {
        Util.saveNewCompetitorCN(mainData.NewCompetitorCN).then(CompetitorCNID => {
            mainData.CompetitorCNID = CompetitorCNID;
            Util.updateMainData(mainData).then(status => {
                if (status === 'success') {
                    console.log(status);
                    res.send(status);
                }
            });
        });
    } else {
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
    if (mainData.CompetitorCNID === 0 && mainData.NewCompetitorCN !== '') {
        Util.saveNewCompetitorCN(mainData.NewCompetitorCN).then(CompetitorCNID => {
            mainData.CompetitorCNID = CompetitorCNID;
            Util.saveNewMainData(mainData).then(dataID => {
                console.log(dataID);
                res.status(200).json(mainData);
            });
        });
    } else {
        Util.saveNewMainData(mainData).then(dataID => {
            console.log(dataID);
            res.status(200).json(mainData);
        });
    }
    // let mainData = JSON.parse(req.param('mainData'));
    //
    // Util.saveNewMainData(mainData).then(dataID => {
    //     // console.log(dataID);
    //     res.send(dataID);
    // })
});

module.exports = router;