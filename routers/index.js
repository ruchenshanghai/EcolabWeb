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
            records.RecordOwner = username;
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
    // let mockMainData = { ID: 4,
    //     Reviewer: 'Chen, Ran （陈冉）',
    //     BUDistrict: '东北',
    //     OpportunityCode: '6000-20170726-1',
    //     Province: '上海市',
    //     City: '浦东新区',
    //     Site: '金桥工业园区',
    //     ChineseName: '中文名',
    //     EnglishName: '英文名',
    //     PipelineStatus: '>90Day',
    //     ContractTerm: '1年',
    //     TargetRate: '不确定',
    //     AnnualSales: 998,
    //     CorporateAccountChinese: '',
    //     CorporateAccountEnglish: '',
    //     SalesRep: '代表',
    //     AssistCAM: 'undefined',
    //     FollowingStatus: 'Audit-审计',
    //     'CTCBU ': 'FB-食品饮料部',
    //     CTCSales: '',
    //     SalesType: [ '客户培训', '方案销售-Large Fly' ],
    //     FollowingStatusRemark: '',
    //     CompetitorCN: [ '233' ],
    //     FirstCollaborationDate: '2017-07-25',
    //     EstimatedPCO: 12,
    //     Remark: '',
    //     MarketClassification: '一般制造业#Manufacturing',
    //     RecordOwner: 'GLOBAL\\wenja',
    //     ReviewerArray:
    //     [ { ID: 2, Detail: 'Chen, Ran （陈冉）' },
    //         { ID: 3, Detail: 'Li, Yingping （李英平）' },
    //         { ID: 4, Detail: 'Ringo Wong （黄耀基）' },
    //         { ID: 6, Detail: 'Su, Heng （苏恒）' },
    //         { ID: 5, Detail: 'Wu, Yunyao （吴云耀）' },
    //         { ID: 1, Detail: 'Xu, Xianggui （徐祥贵）' },
    //         { ID: 8, Detail: 'Yi, Hui （衣慧）' } ],
    //         ContractTermArray:
    //     [ { ID: 2, Detail: '1年' },
    //         { ID: 3, Detail: '2年' },
    //         { ID: 4, Detail: '3年' },
    //         { ID: 1, Detail: '一次性' },
    //         { ID: 5, Detail: '自动续约' } ],
    //         PipelineStatusArray:
    //     [ { ID: 4, Detail: '>90Day' },
    //         { ID: 1, Detail: '30Day' },
    //         { ID: 2, Detail: '60Day' },
    //         { ID: 3, Detail: '90Day' } ],
    //         BUDistrictArray:
    //     [ { ID: 1, Detail: '东北' },
    //         { ID: 5, Detail: '东区' },
    //         { ID: 3, Detail: '中区' },
    //         { ID: 2, Detail: '华北' },
    //         { ID: 4, Detail: '南区' } ],
    //         AssistCAMArray:
    //     [ { ID: 9, Detail: 'Alan Xu （徐祥贵） (20202120)' },
    //         { ID: 3, Detail: 'Allen Tang （唐伟） (20224359)' },
    //         { ID: 8, Detail: 'Camus Zhang （张彦超） (20202233)' },
    //         { ID: 5, Detail: 'Harry Zhou （周彬） (20202528)' },
    //         { ID: 10, Detail: 'Kevin Zhou （周立） (20202339)' },
    //         { ID: 2, Detail: 'Liang Chang （常亮） (20202429)' },
    //         { ID: 11, Detail: 'Liang He （何亮） (20223662)' },
    //         { ID: 4, Detail: 'Lily Zhang （张忻） (20202261)' },
    //         { ID: 12, Detail: 'Matthew Shen （沈以强） (20221938)' },
    //         { ID: 13, Detail: 'Ringo Wong （黄耀基）(202203543)' },
    //         { ID: 6, Detail: 'Shirley Li （李文青） (20201645)' },
    //         { ID: 7, Detail: 'Tina Zhang （张彩瑜） (20202487)' },
    //         { ID: 1, Detail: '不适用' } ],
    //         TargetRateArray:
    //     [ { ID: 5, Detail: '不确定' },
    //         { ID: 3, Detail: '中' },
    //         { ID: 4, Detail: '低' },
    //         { ID: 1, Detail: '已确认' },
    //         { ID: 2, Detail: '高' } ],
    //         CTCBUArray:
    //     [ { ID: 5, Detail: 'FB-食品饮料部' },
    //         { ID: 3, Detail: 'FRS-超市部' },
    //         { ID: 2, Detail: 'Inst-机构部' },
    //         { ID: 7, Detail: 'QSR-快餐部' },
    //         { ID: 4, Detail: 'TCD-纺织护理部' },
    //         { ID: 6, Detail: 'WPS-纳尔科水部门' },
    //         { ID: 1, Detail: '不适用' } ],
    //         SalesTypeArray:
    //     [ { ID: 6, Detail: '仓储害虫-SPP' },
    //         { ID: 1, Detail: '基础四害-Basic' },
    //         { ID: 14, Detail: '客户培训' },
    //         { ID: 13, Detail: '捕蝇灯' },
    //         { ID: 10, Detail: '方案销售-Food Protect' },
    //         { ID: 11, Detail: '方案销售-Hotel Protect' },
    //         { ID: 9, Detail: '方案销售-Large Fly' },
    //         { ID: 12, Detail: '方案销售-Restaurant Protect' },
    //         { ID: 2, Detail: '老鼠-Rodent' },
    //         { ID: 4, Detail: '蚂蚁-Ant' },
    //         { ID: 7, Detail: '蜥蜴-Lizard' },
    //         { ID: 3, Detail: '蟑螂-Cockroach' },
    //         { ID: 5, Detail: '飞虫-flying insect' },
    //         { ID: 8, Detail: '鸟类-Bird' } ],
    //         FollowingStatusArray:
    //     [ { ID: 6, Detail: 'Audit-审计' },
    //         { ID: 3, Detail: 'Bidding-投标' },
    //         { ID: 4, Detail: 'Contract-合同待签署' },
    //         { ID: 1, Detail: 'Follow Up-继续跟进' },
    //         { ID: 5, Detail: 'Gained-已获得' },
    //         { ID: 2, Detail: 'Proposal-提出方案' },
    //         { ID: 7, Detail: 'Scope/Survey-现场审查' } ],
    //         MarketClassificationArray:
    //     [ { ID: 1, Detail: '一般制造业#Manufacturing' },
    //         { ID: 4, Detail: '乳品制造业#Dairy Manufactory' },
    //         { ID: 17, Detail: '包装业#Packaging materials' },
    //         { ID: 12, Detail: '医疗健康机构#Healthcare' },
    //         { ID: 13, Detail: '医药制造#Pharmaceutical Manufactory' },
    //         { ID: 11, Detail: '医药零售#Pharmaceutical Retail' },
    //         { ID: 5, Detail: '快餐业#QSR' },
    //         { ID: 15, Detail: '政府机构及其他#Others' },
    //         { ID: 16, Detail: '教育机构#Education Institution' },
    //         { ID: 9, Detail: '物业管理#Building Management' },
    //         { ID: 8, Detail: '物流及仓储业#Logistics&Warehouse' },
    //         { ID: 7, Detail: '酒店业#Hospitality' },
    //         { ID: 14, Detail: '零售业#Retail' },
    //         { ID: 2, Detail: '食品制造业#Food Manufactory' },
    //         { ID: 10, Detail: '食品零售#Food Retail' },
    //         { ID: 18, Detail: '食品零售业#Food Retail' },
    //         { ID: 6, Detail: '餐饮业（非快餐）#FSR' },
    //         { ID: 3, Detail: '饮料制造业#Beverage Manufactory' } ],
    //         CompetitorCNArray: [ { ID: 2, Detail: '能多洁-Rentokil' } ] }
    // res.render('detail', {
    //     mainData: mockMainData
    // });
    let username = req.connection.user;
    let dataID = req.params.id;
    Util.getMainDataByID(dataID).then(mainData => {
        if (mainData !== null && mainData.RecordOwner.toLowerCase() === String(req.connection.user).toLowerCase()) {
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
    Util.checkAdminIdentity(masterData.Username).then(result => {
        if (result) {
            masterData.tables = Tables;
            res.render('admin', {
                masterData: masterData
            });
        } else {
            res.redirect('/index');
        }
    });
});

router.get('/admin/:tableName', function (req, res) {
    let masterTable = {};
    masterTable.Username = req.connection.user;
    Util.checkAdminIdentity(masterTable.Username).then(result => {
        if (result) {
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

});

router.get('*', function (req, res) {
    console.log('redirect');
    res.redirect('/index');
});


// api
router.post('/update', function (req, res) {
    // console.log(req.body);
    let mainData = req.body;
    mainData.RecordOwner = req.connection.user;
    Util.updateMainData(mainData).then(status => {
        if (status === 'success') {
            console.log(status);
            res.json({
                status: status
            });
        }
    });
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
    mainData.RecordOwner = req.connection.user;
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