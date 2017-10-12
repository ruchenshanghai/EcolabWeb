var path = require('path');
var express = require('express');
var xlsx = require('node-xlsx');
var fs = require('fs');
var path = require('path');

var router = express.Router();
var Util = require('../lib/Util');
var MainData = require('../model/MainData');

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
        Name: 'AssistCAMName'
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

function checkAdminTableName(tableName) {
    for (var index in Tables) {
        if (Tables[index].Name === tableName) {
            return true;
        }
    }
    return false;
}

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
router.get('/detail/:id', function (req, res) {
    let username = req.connection.user;
    let dataID = req.params.id;
    Util.getMainDataByID(dataID).then(mainData => {
        if (mainData !== null) {
            mainData.username = username;
            mainData.IsAdmin = Util.checkAdminRight(username);

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
            mainData.ServiceTimeRequestedStart = mainData.ServiceTimeRequested.split('-')[0];
            mainData.ServiceTimeRequestedEnd = mainData.ServiceTimeRequested.split('-')[1];

            // get meta data
            let promiseArray = new Array();
            promiseArray.push(Util.getMetaDataByTableName(mainData, 'Reviewer'));
            promiseArray.push(Util.getMetaDataByTableName(mainData, 'BUDistrict'));
            promiseArray.push(Util.getMetaDataByTableName(mainData, 'PipelineStatus'));
            promiseArray.push(Util.getMetaDataByTableName(mainData, 'ContractTerm'));
            promiseArray.push(Util.getMetaDataByTableName(mainData, 'TargetRate'));
            promiseArray.push(Util.getMetaDataByTableName(mainData, 'AssistCAMName'));
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
                Util.addCheckedUser(dataID, username);
            });
        } else {
            res.redirect('/index');
        }
    });
});
router.get('/create', function (req, res) {
    let metaData = {};
    let username = req.connection.user;
    metaData.RecordOwner = req.connection.user;
    metaData.IsAdmin = Util.checkAdminRight(username);
    // get meta data
    let promiseArray = new Array();
    promiseArray.push(Util.getMetaDataByTableName(metaData, 'Reviewer'));
    promiseArray.push(Util.getMetaDataByTableName(metaData, 'BUDistrict'));
    promiseArray.push(Util.getMetaDataByTableName(metaData, 'PipelineStatus'));
    promiseArray.push(Util.getMetaDataByTableName(metaData, 'ContractTerm'));
    promiseArray.push(Util.getMetaDataByTableName(metaData, 'TargetRate'));
    promiseArray.push(Util.getMetaDataByTableName(metaData, 'AssistCAMName'));
    promiseArray.push(Util.getMetaDataByTableName(metaData, 'FollowingStatus'));
    promiseArray.push(Util.getMetaDataByTableName(metaData, 'CTCBU'));
    promiseArray.push(Util.getMetaDataByTableName(metaData, 'SalesType'));
    promiseArray.push(Util.getMetaDataByTableName(metaData, 'CompetitorCN'));
    promiseArray.push(Util.getMetaDataByTableName(metaData, 'MarketClassification'));
    Promise.all(promiseArray).then(status => {
        // console.log(metaData);
        res.render('create', {
            metaData: metaData
        });
    });
});
router.get('/download', function (req, res) {
    let username = req.connection.user;
    Util.getAllData(username).then(records => {
        if (JSON.stringify(records) !== "{}") {
            let data = new Array();
            let tempArray = new Array();
            for (let index in records[0]) {
                console.log(index);
                tempArray.push(MainData.getChineseName(index));
            }
            data.push(tempArray);
            for (let index in records) {
                tempArray = new Array();
                for (let key in records[index]) {
                    if (key === 'EstimatedPCO') {
                        tempArray.push(records[index][key] + '%');
                    } else {
                        tempArray.push(records[index][key]);
                    }
                }
                data.push(tempArray);
            }

            res.setHeader("Content-type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            res.setHeader("Content-Disposition", "attachment;filename*=utf-8''" + encodeURIComponent(username) + ".xlsx");
            res.setHeader("Expires", "0");
            res.setHeader("Cache-Control", "no-cache, must-revalidate");
            res.setHeader("Pragma", "no-cache");

            let buffer = xlsx.build([{name: 'report', data: data}]);
            res.send(buffer);
        }
    });
});

router.get('/admin', function (req, res) {
    let masterData = {};
    masterData.Username = req.connection.user;
    if (Util.checkAdminRight(masterData.Username)) {
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
    masterTable.tableName = req.params.tableName;
    if (!checkAdminTableName(masterTable.tableName) || !Util.checkAdminRight(masterTable.Username)) {
        res.redirect('/index');
    } else {
        Util.getMetaDataByTableName(masterTable, masterTable.tableName).then(() => {
            // console.log(masterTable);
            res.render('admin-edit', {
                masterTable: masterTable
            })
        });
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
    let username = req.connection.user;
    if (mainData === null) {
        mainData.RecordOwner = username;
    }
    Util.updateMainData(mainData, username).then(status => {
        if (status === 'success') {
            console.log('update: ' + status);
            res.json({
                status: status
            });
        }
    });
});
router.post('/insert', function (req, res) {
    let mainData = req.body;
    let username = req.connection.user;
    if (mainData.RecordOwner === null) {
        mainData.RecordOwner = username;
    }
    console.log(mainData);
    Util.insertNewMainData(mainData, username).then(dataID => {
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