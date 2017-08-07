var path = require('path');
var express = require('express');

var router = express.Router();
var Util = require('../lib/Util');

let Tables = [
    {
        Name: 'Reviewer'
    },
    {
        Name: 'BUDistrict'
    },
    {
        Name: 'PipelineStatus'
    },
    {
        Name: 'ContractTerm'
    },
    {
        Name: 'TargetRate'
    },
    {
        Name: 'AssistCAM'
    },
    {
        Name: 'FollowingStatus'
    },
    {
        Name: 'CTCBU'
    },
    {
        Name: 'SalesType'
    },
    {
        Name: 'CompetitorCN'
    },
    {
        Name: 'MarketClassification'
    }
];

router.get('/index', function (req, res) {
    let username = req.connection.user;
    Util.getAllData(username).then(records => {
        if (JSON.stringify(records) !== "{}") {
            records.user = username;
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
        if (mainData !== null && Util.checkReviewRight(username, mainData.RecordOwner)) {
            // purify Date
            if (mainData.FirstCollaborationDate !== null) {
                let tempDate = new Date();
                tempDate.setFullYear(mainData.FirstCollaborationDate.getFullYear());
                tempDate.setMonth(mainData.FirstCollaborationDate.getMonth());
                tempDate.setDate(mainData.FirstCollaborationDate.getDate());
                mainData.FirstCollaborationDate = tempDate.Format("yyyy-MM-dd");
            }
            mainData.SalesType = JSON.parse(mainData.SalesType);
            mainData.CompetitorCN = JSON.parse(mainData.CompetitorCN);
            // get meta data
            let promiseArray = new Array();
            promiseArray.push(Util.getMetaDataByTableName(mainData, 'Reviewer'));
            promiseArray.push(Util.getMetaDataByTableName(mainData, 'BUDistrict'));
            promiseArray.push(Util.getMetaDataByTableName(mainData, 'PipelineStatus'));
            promiseArray.push(Util.getMetaDataByTableName(mainData, 'ContractTerm'));
            promiseArray.push(Util.getMetaDataByTableName(mainData, 'TargetRate'));
            promiseArray.push(Util.getMetaDataByTableName(mainData, 'AssistCAM'));
            promiseArray.push(Util.getMetaDataByTableName(mainData, 'FollowingStatus'));
            promiseArray.push(Util.getMetaDataByTableName(mainData, 'CTCBU'));
            promiseArray.push(Util.getMetaDataByTableName(mainData, 'SalesType'));
            promiseArray.push(Util.getMetaDataByTableName(mainData, 'CompetitorCN'));
            promiseArray.push(Util.getMetaDataByTableName(mainData, 'MarketClassification'));
            Promise.all(promiseArray).then(status => {
                // console.log(status);
                res.render('detail', {
                    mainData: mainData
                });
            });
        } else {
            res.redirect('/index');
        }
    });
});

router.get('/create', function (req, res) {
    let metaData = {};
    metaData.RecordOwner = req.connection.user;
    // get meta data
    let promiseArray = new Array();
    promiseArray.push(Util.getMetaDataByTableName(metaData, 'Reviewer'));
    promiseArray.push(Util.getMetaDataByTableName(metaData, 'BUDistrict'));
    promiseArray.push(Util.getMetaDataByTableName(metaData, 'PipelineStatus'));
    promiseArray.push(Util.getMetaDataByTableName(metaData, 'ContractTerm'));
    promiseArray.push(Util.getMetaDataByTableName(metaData, 'TargetRate'));
    promiseArray.push(Util.getMetaDataByTableName(metaData, 'AssistCAM'));
    promiseArray.push(Util.getMetaDataByTableName(metaData, 'FollowingStatus'));
    promiseArray.push(Util.getMetaDataByTableName(metaData, 'CTCBU'));
    promiseArray.push(Util.getMetaDataByTableName(metaData, 'SalesType'));
    promiseArray.push(Util.getMetaDataByTableName(metaData, 'CompetitorCN'));
    promiseArray.push(Util.getMetaDataByTableName(metaData, 'MarketClassification'));
    Promise.all(promiseArray).then(status => {
        // console.log(status);
        res.render('create', {
            metaData: metaData
        });
    });
});

router.get('/admin', function (req, res) {
    let masterData = {};
    masterData.Username = req.connection.user;
    if (Util.checkAdminIdentity(masterData.Username)) {
        masterData.tables = Tables;
        res.render('admin', {
            masterData: masterData
        });
    } else {
        res.redirect('/index');
    }
});

router.get('/admin/:tableName', function (req, res) {
    let masterTable = {};
    masterTable.Username = req.connection.user;
    if (Util.checkAdminIdentity(masterTable.Username)) {
        masterTable.tableName = req.params.tableName;
        Util.getMetaDataByTableName(masterTable, masterTable.tableName).then(() => {
            // console.log(masterTable);
            res.render('admin-edit', {
                masterTable: masterTable
            })
        });
    } else {
        res.redirect('/index');
    }
});

router.get('*', function (req, res) {
    console.log('redirect');
    res.redirect('/index');
});


// api
router.post('/update', function (req, res) {
    // console.log(req.body);
    let mainData = req.body;
    if (Util.checkReviewRight(req.connection.user, mainData.RecordOwner)) {
        Util.updateMainData(mainData).then(status => {
            if (status === 'success') {
                console.log('update: ' + status);
                res.json({
                    status: status
                });
            }
        });
    } else {
        res.json({
            status: 'right error'
        })
    }
});
router.post('/insert', function (req, res) {
    let mainData = req.body;
    mainData.RecordOwner = req.connection.user;
    console.log(mainData);
    Util.insertNewMainData(mainData).then(dataID => {
        console.log(dataID);
        res.json({
            ID: dataID
        });
    });
});
router.post('/delete/:ID', function (req, res) {

    let mainData = {};
    mainData.ID = Number(req.params.ID);
    // console.log(mainData);
    // need to validate identity
    Util.deleteMainData(mainData).then(status => {
        console.log(status);
        res.send(status);
    });
});
router.post('/delete/:tableName/:ID', function (req, res) {
    let tableName = req.params.tableName;
    let ID = Number(req.params.ID);
    Util.deleteMetaDataByTableNameAndID(tableName, ID).then(status => {
        console.log(status);
        res.send(status);
    });
});
router.post('/update/:tableName', function (req, res) {
    let tableName = req.params.tableName;
    let record = req.body;
    Util.updateMetaDataByTableNameAndID(tableName, record).then(status => {
        console.log(status);
        res.json({
            status: status
        });
    });
});
router.post('/insert/:tableName', function (req, res) {
    let tableName = req.params.tableName;
    let insertRecord = req.body;
    Util.insertMetaDataByTableName(tableName, insertRecord).then(status => {
        console.log(status);
        res.json({
            status: status
        });
    });
});

module.exports = router;