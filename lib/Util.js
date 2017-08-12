/**
 * Created by wenjin on 2017/6/18.
 */
var MainData = require('../model/MainData');

var tediousConfig = require('../config/default');
var TYPES = require('tedious').TYPES;
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var moment = require('moment');
var fs = require('fs');


function Util() {
    console.log('Util initial');
};

Util.checkAdminIdentity = function (username) {
    let adminFilePath = 'admin-config.json';
    let adminNames = JSON.parse(fs.readFileSync(adminFilePath));
    for (var index in adminNames) {
        if (String(adminNames[index]).toLowerCase() === String(username).toLowerCase()) {
            return true;
        }
    }
    return false;
}


Util.getAllData = function (username) {
    return new Promise(function (resolve, reject) {
        let connection = new Connection(tediousConfig);
        let sqlStr;

        if (Util.checkAdminIdentity(username)) {
            sqlStr = 'select * from MainData';
        } else {
            sqlStr = 'select * from MainData where RecordOwner=N\'' + username + '\'';
        }
        connection.on('connect', function (err) {
            if (err) {
                reject(err);
            }
            let request = new Request(sqlStr, function (err) {
                if (err) {
                    reject(err);
                }
            });
            var mainDataArray = new Array();
            request.on('row', function (columns) {
                let tempMainData = {};
                columns.forEach(function (column) {
                    let tempName = column.metadata.colName;
                    let tempValue = column.value;
                    tempMainData[tempName] = tempValue;
                });
                mainDataArray.push(tempMainData);
            });
            request.on('doneInProc', function () {
                resolve(mainDataArray);
            });
            connection.execSql(request);
        });
    });
};

Util.updateMainData = function (mainData) {
    return new Promise(function (resolve, reject) {
        let connection = new Connection(tediousConfig);
        connection.on('connect', function (err) {
            if (err) {
                reject(err);
            }
            let sqlStr = 'update MainData set ' +
                'Reviewer=N\'' + mainData.Reviewer + '\', ' +
                'BUDistrict=N\'' + mainData.BUDistrict + '\', ' +
                // 'OpportunityCode=N\'' + mainData.OpportunityCode + '\',' + no need to update
                'Province=N\'' + mainData.Province + '\', ' +
                'City=N\'' + mainData.City + '\', ' +
                'Site=N\'' + mainData.Site + '\', ' +
                'ChineseName=N\'' + mainData.ChineseName + '\', ' +
                'EnglishName=N\'' + mainData.EnglishName + '\', ' +
                'PipelineStatus=N\'' + mainData.PipelineStatus + '\', ' +
                'ContractTerm=N\'' + mainData.ContractTerm + '\', ' +
                'TargetRate=N\'' + mainData.TargetRate + '\', ' +
                'AnnualSales=' + mainData.AnnualSales + ', ' +
                'CorporateAccountChinese=N\'' + mainData.CorporateAccountChinese + '\', ' +
                'CorporateAccountEnglish=N\'' + mainData.CorporateAccountEnglish + '\', ' +
                'SalesRep=N\'' + mainData.SalesRep + '\', ' +
                'AssistCAMName=N\'' + mainData.AssistCAMName + '\', ' +
                'FollowingStatus=N\'' + mainData.FollowingStatus + '\', ' +
                'CTCBU=N\'' + mainData.CTCBU + '\', ' +
                'CTCSales=N\'' + mainData.CTCSales + '\', ' +
                'SalesType=N\'' + mainData.SalesType + '\', ' +
                'FollowingStatusRemark=N\'' + mainData.FollowingStatusRemark + '\', ' +
                'CompetitorCN=N\'' + mainData.CompetitorCN + '\', ' +
                // 'FirstCollaborationDate=N\'' + mainData.FirstCollaborationDate + '\',' +
                'FirstCollaborationDate=' + (mainData.FirstCollaborationDate === null ? null : 'N\'' + mainData.FirstCollaborationDate + '\'') + ', ' +
                'EstimatedPCO=' + mainData.EstimatedPCO + ', ' +
                'Remark=N\'' + mainData.Remark + '\', ' +
                'MarketClassification=N\'' + mainData.MarketClassification + '\'' +
                ' where ID=' + mainData.ID;
                // ' where ID=' + mainData.ID + 'and RecordOwner=N\'' + mainData.RecordOwner + '\'';
            let request = new Request(sqlStr, function (err) {
                if (err) {
                    reject(err);
                }
            });
            connection.execSql(request);
            request.on('doneProc', function (rowCount, more, returnStatus, rows) {
                resolve('success');
            });
        });
    });
}
Util.insertNewMainData = function (mainData) {
    return new Promise(function (resolve, reject) {
        Util.getOpportunityCode().then(code => {
            mainData.OpportunityCode = code;
            let connection = new Connection(tediousConfig);
            connection.on('connect', function (err) {
                if (err) {
                    reject(err);
                }
                console.log(mainData);
                let sqlStr = 'INSERT INTO MainData (Reviewer, BUDistrict, OpportunityCode, Province, City, Site, ChineseName, EnglishName, ' +
                    'PipelineStatus, ContractTerm, TargetRate, AnnualSales, CorporateAccountChinese, CorporateAccountEnglish, ' +
                    'SalesRep, AssistCAMName, FollowingStatus, CTCBU, CTCSales, SalesType, FollowingStatusRemark, CompetitorCN, ' +
                    'FirstCollaborationDate, EstimatedPCO, Remark, MarketClassification, RecordOwner) VALUES (' +
                    'N\'' + mainData.Reviewer + '\', ' +
                    'N\'' + mainData.BUDistrict + '\', ' +
                    'N\'' + mainData.OpportunityCode + '\', ' +
                    'N\'' + mainData.Province + '\', ' +
                    'N\'' + mainData.City + '\', ' +
                    'N\'' + mainData.Site + '\', ' +
                    'N\'' + mainData.ChineseName + '\', ' +
                    'N\'' + mainData.EnglishName + '\', ' +
                    'N\'' + mainData.PipelineStatus + '\', ' +
                    'N\'' + mainData.ContractTerm + '\', ' +
                    'N\'' + mainData.TargetRate + '\', ' +
                    mainData.AnnualSales + ', ' +
                    ((mainData.CorporateAccountChinese === null) ? null : ('N\'' + mainData.CorporateAccountChinese + '\'')) + ', ' +
                    ((mainData.CorporateAccountEnglish === null) ? null : ('N\'' + mainData.CorporateAccountEnglish + '\'')) + ', ' +
                    'N\'' + mainData.SalesRep + '\', ' +
                    ((mainData.AssistCAMName === null) ? null : ('N\'' + mainData.AssistCAMName + '\'')) + ', ' +
                    'N\'' + mainData.FollowingStatus + '\', ' +
                    ((mainData.CTCBU === null) ? null : ('N\'' + mainData.CTCBU + '\'')) + ', ' +
                    ((mainData.CTCSales === null) ? null : ('N\'' + mainData.CTCSales + '\'')) + ', ' +
                    'N\'' + mainData.SalesType + '\', ' +
                    ((mainData.FollowingStatusRemark === null) ? null : ('N\'' + mainData.FollowingStatusRemark + '\'')) + ', ' +
                    'N\'' + mainData.CompetitorCN + '\', ' +
                    ((mainData.FirstCollaborationDate === null) ? null : ('N\'' + mainData.FirstCollaborationDate + '\'')) + ', ' +
                    mainData.EstimatedPCO + ', ' +
                    ((mainData.Remark === null) ? null : ('N\'' + mainData.Remark + '\'')) + ', ' +
                    'N\'' + mainData.MarketClassification + '\', ' +
                    'N\'' + mainData.RecordOwner + '\'' +
                    ') SELECT @@IDENTITY';
                let request = new Request(sqlStr, function (err) {
                    if (err) {
                        reject(err);
                    }
                });
                connection.execSql(request);
                request.on('row', function (columns) {
                    columns.forEach(column => {
                        // console.log(column.value);
                        mainData.ID = column.value;
                        resolve(column.value);
                    });
                });
            });
        });
    });
};
Util.getMainDataByID = function (mainDataID) {
    return new Promise(function (resolve, reject) {
        let connection = new Connection(tediousConfig);
        connection.on('connect', function (err) {
            if (err) {
                reject(err);
            }
            let sqlStr = 'select * from MainData where ID=' + mainDataID;
            let request = new Request(sqlStr, function (err) {
                if (err) {
                    reject(err);
                }
            });
            let reaultMainData = {};
            request.on('row', function (columns) {
                columns.forEach(function (column) {
                    let tempName = column.metadata.colName;
                    let tempValue = column.value;
                    reaultMainData[tempName] = tempValue;
                });
            });
            request.on('doneProc', function () {
                if (JSON.stringify(reaultMainData) !== '{}') {
                    // get meta data
                    resolve(reaultMainData);
                } else {
                    resolve(null);
                }

            });
            connection.execSql(request);
        });
    });
}
Util.deleteMainData = function (mainData) {
    return new Promise(function (resolve, reject) {
        let connection = new Connection(tediousConfig);
        connection.on('connect', function (err) {
            if (err) {
                reject(err);
            }
            let sqlStr = 'delete from MainData where ID=' + mainData.ID;
            // let sqlStr = 'delete from MainData where ID=' + mainData.ID + ' and RecordOwner=N\'' + mainData.RecordOwner + '\'';
            let request = new Request(sqlStr, function (err) {
                if (err) {
                    reject(err);
                }
            });
            request.on('doneProc', function () {
                resolve('success');
            });
            connection.execSql(request);
        });
    });
}

Util.getMetaDataByTableName = function (metaData, tableName) {
    return new Promise(function (resolve, reject) {
        let connection = new Connection(tediousConfig);
        connection.on('connect', function (err) {
            if (err) {
                reject(err);
            }
            let sqlStr = 'select * from ' + tableName;
            let request = new Request(sqlStr, function (err) {
                if (err) {
                    reject(err);
                }
            });
            var tempArray = new Array();
            request.on('row', function (columns) {
                let tempMetaData = {};
                columns.forEach(function (column) {
                    let tempName = column.metadata.colName;
                    let tempValue = column.value;
                    tempMetaData[tempName] = tempValue;
                });
                tempArray.push(tempMetaData);
            });
            request.on('doneProc', function () {
                metaData[tableName + 'Array'] = tempArray;
                resolve(tableName);
            });
            connection.execSql(request);
        });
    });
}
Util.deleteMetaDataByTableNameAndID = function (tableName, ID) {
    return new Promise(function (resolve, reject) {
        let connection = new Connection(tediousConfig);
        connection.on('connect', function (err) {
            if (err) {
                reject(err);
            }
            let sqlStr = 'delete from ' + tableName + ' where ID=' + ID;
            let request = new Request(sqlStr, function (err) {
                if (err) {
                    reject(err);
                }
            });
            request.on('doneProc', function () {
                resolve('success');
            });
            connection.execSql(request);
        });
    });
}
Util.updateMetaDataByTableNameAndID = function (tableName, record) {
    return new Promise(function (resolve, reject) {
        let connection = new Connection(tediousConfig);
        connection.on('connect', function (err) {
            if (err) {
                reject(err);
            }
            let sqlStr;
            if (tableName === 'Reviewer') {
                sqlStr = 'update ' + tableName + ' set ' +
                    'Detail=N\'' + record.Detail + '\', ' +
                    'DomainName=N\'' + record.DomainName + '\'' +
                    ' where ID=' + record.ID;
            } else {
                sqlStr = 'update ' + tableName + ' set ' +
                    'Detail=N\'' + record.Detail + '\'' +
                    ' where ID=' + record.ID;
            }

            let request = new Request(sqlStr, function (err) {
                if (err) {
                    reject(err);
                }
            });
            connection.execSql(request);
            request.on('doneProc', function (rowCount, more, returnStatus, rows) {
                resolve('success');
            });
        });
    });
}
Util.insertMetaDataByTableName = function (tableName, record) {
    return new Promise(function (resolve, reject) {
        let connection = new Connection(tediousConfig);
        connection.on('connect', function (err) {
            if (err) {
                reject(err);
            }
            let sqlStr;
            if (tableName === 'Reviewer') {
                sqlStr = 'insert into ' + tableName + ' (Detail, DomainName) values (' + 'N\'' + record.Detail + '\', N\'' + record.DomainName + '\')';
            } else {
                sqlStr = 'insert into ' + tableName + ' (Detail) values (' + 'N\'' + record.Detail + '\')';
            }
            let request = new Request(sqlStr, function (err) {
                if (err) {
                    reject(err);
                }
            });
            connection.execSql(request);
            request.on('doneProc', function (rowCount, more, returnStatus, rows) {
                resolve('success');
            });
        });
    });
}


Util.getOpportunityCode = function () {
    return new Promise(function (resolve, reject) {
        let connection = new Connection(tediousConfig);
        connection.on('connect', function (err) {
            if (err) {
                reject(err);
            }

            let tempDate = moment().format('YYYYMMDD');
            // console.log(tempDate);
            let sqlStr = 'select * from MainData where OpportunityCode like\'%' + tempDate + '%\'';
            let request = new Request(sqlStr, function (err) {
                if (err) {
                    reject(err);
                }
            });
            let count = 0;
            request.on('row', function (columns) {
                count++;
            });
            request.on('doneProc', function () {
                count++;
                let code = '6000-' + tempDate + '-';
                code += count;
                console.log(code);
                resolve(code);
            });
            connection.execSql(request);
        });
    });
};



module.exports = Util;