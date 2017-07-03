var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var app = express();
var server = require('http').createServer(app);

var indexRouter = require('./routers/index');
var config = require('./config/default');
var MainData = require('./model/MainData');
var Util = require('./lib/Util');


app.set('views', path.join(__dirname, 'public/template'));
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
    var nodeSSPI = require('node-sspi');
    var nodeSSPIObj = new nodeSSPI({
        retrieveGroups: true
    });
    nodeSSPIObj.authenticate(req, res, function(err){
        res.finished || next();
    });
});

app.use(bodyParser.json());
app.use('/', indexRouter);
// // 404 page
// app.use(function (req, res) {
//     if (!res.headersSent) {
//         res.redirect('/index');
//     }
// });
// app.get('*', function (req, res) {
//     console.log('app redirect');
//     res.redirect('/index');
//     // console.log(req.connection.user);
// });

// let tempMeta = {};
// let promiseArray = new Array();
// promiseArray.push(Util.getMetaDataByTableName(tempMeta, 'Reviewer'));
// promiseArray.push(Util.getMetaDataByTableName(tempMeta, 'BUDistrict'));
// promiseArray.push(Util.getMetaDataByTableName(tempMeta, 'PipelineStatus'));
// promiseArray.push(Util.getMetaDataByTableName(tempMeta, 'ContractTerm'));
// promiseArray.push(Util.getMetaDataByTableName(tempMeta, 'TargetRate'));
// promiseArray.push(Util.getMetaDataByTableName(tempMeta, 'AssistCAM'));
// promiseArray.push(Util.getMetaDataByTableName(tempMeta, 'FollowingStatus'));
// promiseArray.push(Util.getMetaDataByTableName(tempMeta, 'CTCBU'));
// promiseArray.push(Util.getMetaDataByTableName(tempMeta, 'SalesType'));
// promiseArray.push(Util.getMetaDataByTableName(tempMeta, 'CompetitorCN'));
// promiseArray.push(Util.getMetaDataByTableName(tempMeta, 'MarketClassification'));
// Promise.all(promiseArray).then(data => {
//     console.log(data);
//     console.log(tempMeta);
// });

// test Util.saveNewMainData
// let testData = new MainData();
// testData.constructTest();
// Util.saveNewMainData(testData).then(dataID => {
//     console.log(dataID);
// });



server.listen(config.port, function () {
    console.log('Express server listening on port %d in %s mode', config.port, app.get('env'));
});