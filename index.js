var express = require('express');
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

app.use('/', indexRouter);
// 404 page
app.use(function (req, res) {
    if (!res.headersSent) {
        res.redirect('/index');
    }
});

// let testData = new MainData();
// Util.resolveMainData(testData).then(value => {
//     console.log(value);
//     testData.Province = '上海';
//     testData.SalesRep = '黄鹤';
//     Util.updateMainData(testData).then(value => {
//         console.log(value);
//     });
// });


// let testData = new MainData();
// testData.constructTest();
// Util.saveNewMainData(testData).then(value => {
//     console.log('mainDataID: ' + value);
//     Util.getMainDataByID(value).then(value => {
//         console.log(value);
//     });
// });

// Util.saveNewCompetitorCN('地头蛇').then(value => {
//     console.log(value);
// });

// domain login
// const sql = require('mssql/msnodesqlv8');
//
// const pool = new sql.ConnectionPool({
//     database: 'GTWPEST',
//     server: 'CNSHASQLSDB01P',
//     driver: 'msnodesqlv8',
//     options: {
//         trustedConnection: true
//     }
// })
//
// pool.connect().then(() => {
//     //simple query
//     pool.request().query('select * from MainData', (err, result) => {
//         console.log(result);
//     });
// });

server.listen(config.port, function () {
    console.log('Express server listening on port %d in %s mode', config.port, app.get('env'));
});