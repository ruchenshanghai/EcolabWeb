var path = require('path');
var express = require('express');

var router = express.Router();
var Util = require('../lib/Util');


router.get('/index', function (req, res) {
    // res.sendFile(path.join(__dirname, '../public/html/index.html'));
    let username = req.connection.user;
    Util.getAllData(username).then(records => {
        if (JSON.stringify(records) !== "{}") {
            records.Username = username;
            res.render('index', {
                records: records
            });
        }
    });
});

Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
router.get('/detail/:id', function (req, res) {
    let username = req.connection.user;
    let dataID = req.params.id;
    Util.getMainDataByID(dataID).then(mainData => {
        // purify Date
        if (mainData !== null) {
            if (mainData.FirstCollaborationDate !== null) {
                let tempDate = new Date();
                tempDate.setFullYear(mainData.FirstCollaborationDate.getFullYear());
                tempDate.setMonth(mainData.FirstCollaborationDate.getMonth());
                tempDate.setDate(mainData.FirstCollaborationDate.getDate());
                mainData.FirstCollaborationDate = tempDate.Format("yyyy-MM-dd");
            }
            res.render('detail', {
                mainData: mainData
            });
        } else {
            res.redirect('/index');
        }
    });
    // res.sendFile(path.join(__dirname, '../public/html/detail.html'));
});

router.get('/create', function (req, res) {
    // res.sendFile(path.join(__dirname, '../public/html/index.html'));
    let username = req.connection.user;
    let metaData = {};
    metaData.Username = username;
    Util.getMetaData(metaData).then(metaData => {
        // console.log(data);
        res.render('create', {
            metaData: metaData
        });
    });
    // res.sendFile(path.join(__dirname, '../public/html/create.html'));
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
    Util.updateMainData(mainData).then(status => {
        if (status === 'success') {
            console.log(status);
            res.send(status);
        }
    });
});
router.post('/metaData', function (req, res) {
    let metaData = {};
    Util.getMetaData(metaData).then(metaData => {
        res.send(metaData);
    });
});
router.post('/create', function (req, res) {
    let mainData = JSON.parse(req.param('mainData'));
    mainData.Username = req.connection.user;
    Util.saveNewMainData(mainData).then(dataID => {
        console.log(dataID);
        res.status(200).json(mainData);
    });
});
router.post('/delete', function (req, res) {
    let mainData = JSON.parse(req.param('mainData'));
    // console.log(mainData);
    Util.deleteMainData(mainData).then(status => {
        console.log(status);
        res.send(status);
    });
});

router.get('*', function (req, res) {
   res.redirect('/index');
});

module.exports = router;