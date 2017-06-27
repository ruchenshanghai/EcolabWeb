/**
 * Created by wenjin on 2017/6/18.
 */
var MainData = require('../model/MainData');

var tediousConfig = require('../config/default');
var TYPES = require('tedious').TYPES;
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var moment = require('moment');

// var tds = require("tedious-ntlm");
// var Connection = require("tedious-ntlm").Connection;
// var Request = require("tedious-ntlm").Request;

function Util() {
    // console.log('Util initial');
};

Util.updataCompetitorCN = function () {
    return new Promise(function (resolve, reject) {
        let connection = new Connection(tediousConfig);
        connection.on('connect', function (err) {
            if (err) {
                reject(err);
            }
            let sqlStr = 'select * from CompetitorCN';
            let request = new Request(sqlStr, function (err) {
                if (err) {
                    reject(err);
                }
            });
            var CompetitorCNArray = new Array();
            request.on('row', function (columns) {
                let tempMainData = {};
                columns.forEach(function (column) {
                    let tempName = column.metadata.colName;
                    let tempValue = column.value;
                    tempMainData[tempName] = tempValue;
                });
                CompetitorCNArray.push(tempMainData);
            });
            request.on('doneProc', function () {
                resolve(CompetitorCNArray);
            });
            connection.execSql(request);
        });
    });
};

Util.getReviewer = function (mainData) {
    // console.log('ReviewerID: ' + mainData.ReviewerID);
    return new Promise(function (resolve, reject) {
        let connection = new Connection(tediousConfig);
        connection.on('connect', function (err) {
            if (err) {
                reject(err);
            }
            let sqlStr = 'select * from Reviewer where ID=' + mainData.ReviewerID;
            let request = new Request(sqlStr, function (err) {
                if (err) {
                    reject(err);
                }
            });
            request.on('row', function (columns, idx) {
                columns.forEach(function (column) {
                    switch (column.metadata.colName) {
                        case 'ID': {
                            // console.log('ID: ' + column.value);
                        }
                            break;
                        case 'Name': {
                            // console.log('Name: ' + column.value);
                            mainData.ReviewerName = column.value;
                            resolve(column.value);
                        }
                            break;
                    }
                });
            });
            connection.execSql(request);
        });
    });
};
Util.getBUDistrict = function (mainData) {
    // console.log('BUDistrictID: ' + mainData.BUDistrictID);
    return new Promise(function (resolve, reject) {
        let connection = new Connection(tediousConfig);
        connection.on('connect', function (err) {
            if (err) {
                reject(err);
            }
            let sqlStr = 'select * from BUDistrict where ID=' + mainData.BUDistrictID;
            let request = new Request(sqlStr, function (err) {
                if (err) {
                    reject(err);
                }
            });
            request.on('row', function (columns, idx) {
                columns.forEach(function (column) {
                    switch (column.metadata.colName) {
                        case 'ID': {
                            // console.log('ID: ' + column.value);
                        }
                            break;
                        case 'Name': {
                            // console.log('Name: ' + column.value);
                            mainData.BUDistrictName = column.value;
                            resolve(column.value);
                        }
                            break;
                    }
                });
            });
            connection.execSql(request);
        });
    });
};
Util.getPipelineStatus = function (mainData) {
    // console.log('PipelineStatusID: ' + mainData.PipelineStatusID);
    return new Promise(function (resolve, reject) {
        let connection = new Connection(tediousConfig);
        connection.on('connect', function (err) {
            if (err) {
                reject(err);
            }
            let sqlStr = 'select * from PipelineStatus where ID=' + mainData.PipelineStatusID;
            let request = new Request(sqlStr, function (err) {
                if (err) {
                    reject(err);
                }
            });
            request.on('row', function (columns, idx) {
                columns.forEach(function (column) {
                    switch (column.metadata.colName) {
                        case 'ID': {
                            // console.log('ID: ' + column.value);
                        }
                            break;
                        case 'Detail': {
                            // console.log('Detail: ' + column.value);
                            mainData.PipelineStatusDetail = column.value;
                            resolve(column.value);
                        }
                            break;
                    }
                });
            });
            connection.execSql(request);
        });
    });
};
Util.getContractTerm = function (mainData) {
    // console.log('ContractTermID: ' + mainData.ContractTermID);
    return new Promise(function (resolve, reject) {
        let connection = new Connection(tediousConfig);
        connection.on('connect', function (err) {
            if (err) {
                reject(err);
            }
            let sqlStr = 'select * from ContractTerm where ID=' + mainData.ContractTermID;
            let request = new Request(sqlStr, function (err) {
                if (err) {
                    reject(err);
                }
            });
            request.on('row', function (columns, idx) {
                columns.forEach(function (column) {
                    switch (column.metadata.colName) {
                        case 'ID': {
                            // console.log('ID: ' + column.value);
                        }
                            break;
                        case 'Detail': {
                            // console.log('Detail: ' + column.value);
                            mainData.ContractTermDetail = column.value;
                            resolve(column.value);
                        }
                            break;
                    }
                });
            });
            connection.execSql(request);
        });
    });
};
Util.getTargetRate = function (mainData) {
    // console.log('TargetRateID: ' + mainData.TargetRateID);
    return new Promise(function (resolve, reject) {
        let connection = new Connection(tediousConfig);
        connection.on('connect', function (err) {
            if (err) {
                reject(err);
            }
            let sqlStr = 'select * from TargetRate where ID=' + mainData.TargetRateID;
            let request = new Request(sqlStr, function (err) {
                if (err) {
                    reject(err);
                }
            });
            request.on('row', function (columns, idx) {
                columns.forEach(function (column) {
                    switch (column.metadata.colName) {
                        case 'ID': {
                            // console.log('ID: ' + column.value);
                        }
                            break;
                        case 'Detail': {
                            // console.log('Detail: ' + column.value);
                            mainData.TargetRateDetail = column.value;
                            resolve(column.value);
                        }
                            break;
                    }
                });
            });
            connection.execSql(request);
        });
    });
};
Util.getAssistCAMName = function (mainData) {
    // console.log('AssistCAMNameID: ' + mainData.AssistCAMNameID);
    return new Promise(function (resolve, reject) {
        let connection = new Connection(tediousConfig);
        connection.on('connect', function (err) {
            if (err) {
                reject(err);
            }
            let sqlStr = 'select * from AssistCAMName where ID=' + mainData.AssistCAMNameID;
            let request = new Request(sqlStr, function (err) {
                if (err) {
                    reject(err);
                }
            });
            request.on('row', function (columns, idx) {
                columns.forEach(function (column) {
                    switch (column.metadata.colName) {
                        case 'ID': {
                            // console.log('ID: ' + column.value);
                        }
                            break;
                        case 'Detail': {
                            // console.log('Detail: ' + column.value);
                            mainData.AssistCAMNameDetail = column.value;
                        }
                            break;
                    }
                });
            });
            connection.execSql(request);
            request.on('doneProc', function () {
                resolve('get AssistCAMName');
            });
        });
    });
};
Util.getFollowingStatus = function (mainData) {
    // console.log('FollowingStatusID: ' + mainData.FollowingStatusID);
    return new Promise(function (resolve, reject) {
        let connection = new Connection(tediousConfig);
        connection.on('connect', function (err) {
            if (err) {
                reject(err);
            }
            let sqlStr = 'select * from FollowingStatus where ID=' + mainData.FollowingStatusID;
            let request = new Request(sqlStr, function (err) {
                if (err) {
                    reject(err);
                }
            });
            request.on('row', function (columns, idx) {
                columns.forEach(function (column) {
                    switch (column.metadata.colName) {
                        case 'ID': {
                            // console.log('ID: ' + column.value);
                        }
                            break;
                        case 'Detail': {
                            // console.log('Detail: ' + column.value);
                            mainData.FollowingStatusDetail = column.value;
                            resolve(column.value);
                        }
                            break;
                    }
                });
            });
            connection.execSql(request);
        });
    });
};
Util.getCTCBU = function (mainData) {
    // console.log('CTCBUID: ' + mainData.CTCBUID);
    return new Promise(function (resolve, reject) {
        let connection = new Connection(tediousConfig);
        connection.on('connect', function (err) {
            if (err) {
                reject(err);
            }
            let sqlStr = 'select * from CTCBU where ID=' + mainData.CTCBUID;
            let request = new Request(sqlStr, function (err) {
                if (err) {
                    reject(err);
                }
            });
            request.on('row', function (columns, idx) {
                columns.forEach(function (column) {
                    switch (column.metadata.colName) {
                        case 'ID': {
                            // .log('ID: ' + column.value);
                        }
                            break;
                        case 'Name': {
                            // console.log('Name: ' + column.value);
                            mainData.CTCBUName = column.value;
                        }
                            break;
                    }
                });
            });
            connection.execSql(request);
            request.on('doneProc', function () {
                resolve('get CTCBU');
            });
        });
    });
};
Util.getSalesType = function (mainData) {
    // console.log('SalesTypeID: ' + mainData.SalesTypeID);
    return new Promise(function (resolve, reject) {
        let connection = new Connection(tediousConfig);
        connection.on('connect', function (err) {
            if (err) {
                reject(err);
            }
            let sqlStr = 'select * from SalesType where ID=' + mainData.SalesTypeID;
            let request = new Request(sqlStr, function (err) {
                if (err) {
                    reject(err);
                }
            });
            request.on('row', function (columns, idx) {
                columns.forEach(function (column) {
                    switch (column.metadata.colName) {
                        case 'ID': {
                            // console.log('ID: ' + column.value);
                        }
                            break;
                        case 'Name': {
                            // console.log('Name: ' + column.value);
                            mainData.SalesTypeName = column.value;
                            resolve(column.value);
                        }
                            break;
                    }
                });
            });
            connection.execSql(request);
        });
    });
};
// Util.getCompetitorCN = function (mainData) {
//     // console.log('CompetitorCNID: ' + mainData.CompetitorCNID);
//     return new Promise(function (resolve, reject) {
//         let connection = new Connection(tediousConfig);
//         connection.on('connect', function (err) {
//             if (err) {
//                 reject(err);
//             }
//             let sqlStr = 'select * from CompetitorCN where ID=' + mainData.CompetitorCNID;
//             let request = new Request(sqlStr, function (err) {
//                 if (err) {
//                     reject(err);
//                 }
//             });
//             request.on('row', function (columns, idx) {
//                 columns.forEach(function (column) {
//                     switch (column.metadata.colName) {
//                         case 'ID': {
//                             // console.log('ID: ' + column.value);
//                         }
//                             break;
//                         case 'Name': {
//                             // console.log('Name: ' + column.value);
//                             mainData.CompetitorCNName = column.value;
//                             resolve(column.value);
//                         }
//                             break;
//                     }
//                 });
//             });
//             connection.execSql(request);
//         });
//     });
// };
Util.getMarketClassification = function (mainData) {
    // console.log('MarketClassificationID: ' + mainData.MarketClassificationID);
    return new Promise(function (resolve, reject) {
        let connection = new Connection(tediousConfig);
        connection.on('connect', function (err) {
            if (err) {
                reject(err);
            }
            let sqlStr = 'select * from MarketClassification where ID=' + mainData.MarketClassificationID;
            let request = new Request(sqlStr, function (err) {
                if (err) {
                    reject(err);
                }
            });
            request.on('row', function (columns, idx) {
                columns.forEach(function (column) {
                    switch (column.metadata.colName) {
                        case 'ID': {
                            // console.log('ID: ' + column.value);
                        }
                            break;
                        case 'Name': {
                            // console.log('Name: ' + column.value);
                            mainData.MarketClassificationName = column.value;
                            resolve(column.value);
                        }
                            break;
                    }
                });
            });
            connection.execSql(request);
        });
    });
};

Util.getAllReviewer = function (mainData) {
    return new Promise(function (resolve, reject) {
        let connection = new Connection(tediousConfig);
        connection.on('connect', function (err) {
            if (err) {
                reject(err);
            }
            let sqlStr = 'select * from Reviewer';
            let request = new Request(sqlStr, function (err) {
                if (err) {
                    reject(err);
                }
            });
            var ReviewerArray = new Array();
            request.on('row', function (columns) {
                let tempMainData = {};
                columns.forEach(function (column) {
                    let tempName = column.metadata.colName;
                    let tempValue = column.value;
                    tempMainData[tempName] = tempValue;
                });
                ReviewerArray.push(tempMainData);
            });
            request.on('doneProc', function () {
                mainData.ReviewerArray = ReviewerArray;
                resolve('get All Reviewer');
            });
            connection.execSql(request);
        });
    });
};
Util.getAllBUDistrict = function (mainData) {
    return new Promise(function (resolve, reject) {
        let connection = new Connection(tediousConfig);
        connection.on('connect', function (err) {
            if (err) {
                reject(err);
            }
            let sqlStr = 'select * from BUDistrict';
            let request = new Request(sqlStr, function (err) {
                if (err) {
                    reject(err);
                }
            });
            var BUDistrictArray = new Array();
            request.on('row', function (columns) {
                let tempMainData = {};
                columns.forEach(function (column) {
                    let tempName = column.metadata.colName;
                    let tempValue = column.value;
                    tempMainData[tempName] = tempValue;
                });
                BUDistrictArray.push(tempMainData);
            });
            request.on('doneProc', function () {
                mainData.BUDistrictArray = BUDistrictArray;
                resolve('get All BUDistrict');
            });
            connection.execSql(request);
        });
    });
};
Util.getAllPipelineStatus = function (mainData) {
    return new Promise(function (resolve, reject) {
        let connection = new Connection(tediousConfig);
        connection.on('connect', function (err) {
            if (err) {
                reject(err);
            }
            let sqlStr = 'select * from PipelineStatus';
            let request = new Request(sqlStr, function (err) {
                if (err) {
                    reject(err);
                }
            });
            var PipelineStatusArray = new Array();
            request.on('row', function (columns) {
                let tempMainData = {};
                columns.forEach(function (column) {
                    let tempName = column.metadata.colName;
                    let tempValue = column.value;
                    tempMainData[tempName] = tempValue;
                });
                PipelineStatusArray.push(tempMainData);
            });
            request.on('doneProc', function () {
                mainData.PipelineStatusArray = PipelineStatusArray;
                resolve('get All PipelineStatus');
            });
            connection.execSql(request);
        });
    });
};
Util.getAllContractTerm = function (mainData) {
    return new Promise(function (resolve, reject) {
        let connection = new Connection(tediousConfig);
        connection.on('connect', function (err) {
            if (err) {
                reject(err);
            }
            let sqlStr = 'select * from ContractTerm';
            let request = new Request(sqlStr, function (err) {
                if (err) {
                    reject(err);
                }
            });
            var ContractTermArray = new Array();
            request.on('row', function (columns) {
                let tempMainData = {};
                columns.forEach(function (column) {
                    let tempName = column.metadata.colName;
                    let tempValue = column.value;
                    tempMainData[tempName] = tempValue;
                });
                ContractTermArray.push(tempMainData);
            });
            request.on('doneProc', function () {
                mainData.ContractTermArray = ContractTermArray;
                resolve('get All ContractTerm');
            });
            connection.execSql(request);
        });
    });
};
Util.getAllTargetRate = function (mainData) {
    return new Promise(function (resolve, reject) {
        let connection = new Connection(tediousConfig);
        connection.on('connect', function (err) {
            if (err) {
                reject(err);
            }
            let sqlStr = 'select * from TargetRate';
            let request = new Request(sqlStr, function (err) {
                if (err) {
                    reject(err);
                }
            });
            var TargetRateArray = new Array();
            request.on('row', function (columns) {
                let tempMainData = {};
                columns.forEach(function (column) {
                    let tempName = column.metadata.colName;
                    let tempValue = column.value;
                    tempMainData[tempName] = tempValue;
                });
                TargetRateArray.push(tempMainData);
            });
            request.on('doneProc', function () {
                mainData.TargetRateArray = TargetRateArray;
                resolve('get All TargetRate');
            });
            connection.execSql(request);
        });
    });
};
Util.getAllAssistCAMName = function (mainData) {
    return new Promise(function (resolve, reject) {
        let connection = new Connection(tediousConfig);
        connection.on('connect', function (err) {
            if (err) {
                reject(err);
            }
            let sqlStr = 'select * from AssistCAMName';
            let request = new Request(sqlStr, function (err) {
                if (err) {
                    reject(err);
                }
            });
            var AssistCAMNameArray = new Array();
            request.on('row', function (columns) {
                let tempMainData = {};
                columns.forEach(function (column) {
                    let tempName = column.metadata.colName;
                    let tempValue = column.value;
                    tempMainData[tempName] = tempValue;
                });
                AssistCAMNameArray.push(tempMainData);
            });
            request.on('doneProc', function () {
                mainData.AssistCAMNameArray = AssistCAMNameArray;
                resolve('get All AssistCAMName');
            });
            connection.execSql(request);
        });
    });
};
Util.getAllFollowingStatus = function (mainData) {
    return new Promise(function (resolve, reject) {
        let connection = new Connection(tediousConfig);
        connection.on('connect', function (err) {
            if (err) {
                reject(err);
            }
            let sqlStr = 'select * from FollowingStatus';
            let request = new Request(sqlStr, function (err) {
                if (err) {
                    reject(err);
                }
            });
            var FollowingStatusArray = new Array();
            request.on('row', function (columns) {
                let tempMainData = {};
                columns.forEach(function (column) {
                    let tempName = column.metadata.colName;
                    let tempValue = column.value;
                    tempMainData[tempName] = tempValue;
                });
                FollowingStatusArray.push(tempMainData);
            });
            request.on('doneProc', function () {
                mainData.FollowingStatusArray = FollowingStatusArray;
                resolve('get All FollowingStatus');
            });
            connection.execSql(request);
        });
    });
};
Util.getAllCTCBU = function (mainData) {
    return new Promise(function (resolve, reject) {
        let connection = new Connection(tediousConfig);
        connection.on('connect', function (err) {
            if (err) {
                reject(err);
            }
            let sqlStr = 'select * from CTCBU';
            let request = new Request(sqlStr, function (err) {
                if (err) {
                    reject(err);
                }
            });
            var CTCBUArray = new Array();
            request.on('row', function (columns) {
                let tempMainData = {};
                columns.forEach(function (column) {
                    let tempName = column.metadata.colName;
                    let tempValue = column.value;
                    tempMainData[tempName] = tempValue;
                });
                CTCBUArray.push(tempMainData);
            });
            request.on('doneProc', function () {
                mainData.CTCBUArray = CTCBUArray;
                resolve('get All CTCBU');
            });
            connection.execSql(request);
        });
    });
};
Util.getAllSalesType = function (mainData) {
    return new Promise(function (resolve, reject) {
        let connection = new Connection(tediousConfig);
        connection.on('connect', function (err) {
            if (err) {
                reject(err);
            }
            let sqlStr = 'select * from SalesType';
            let request = new Request(sqlStr, function (err) {
                if (err) {
                    reject(err);
                }
            });
            var SalesTypeArray = new Array();
            request.on('row', function (columns) {
                let tempMainData = {};
                columns.forEach(function (column) {
                    let tempName = column.metadata.colName;
                    let tempValue = column.value;
                    tempMainData[tempName] = tempValue;
                });
                SalesTypeArray.push(tempMainData);
            });
            request.on('doneProc', function () {
                mainData.SalesTypeArray = SalesTypeArray;
                resolve('get All SalesType');
            });
            connection.execSql(request);
        });
    });
};
Util.getAllCompetitorCN = function (mainData) {
    return new Promise(function (resolve, reject) {
        let connection = new Connection(tediousConfig);
        connection.on('connect', function (err) {
            if (err) {
                reject(err);
            }
            let sqlStr = 'select * from CompetitorCN';
            let request = new Request(sqlStr, function (err) {
                if (err) {
                    reject(err);
                }
            });
            var CompetitorCNArray = new Array();
            request.on('row', function (columns) {
                let tempMainData = {};
                columns.forEach(function (column) {
                    let tempName = column.metadata.colName;
                    let tempValue = column.value;
                    tempMainData[tempName] = tempValue;
                });
                CompetitorCNArray.push(tempMainData);
            });
            request.on('doneProc', function () {
                mainData.CompetitorCNArray = CompetitorCNArray;
                resolve('get All CompetitorCN');
            });
            connection.execSql(request);
        });
    });
};
Util.getAllMarketClassification = function (mainData) {
    return new Promise(function (resolve, reject) {
        let connection = new Connection(tediousConfig);
        connection.on('connect', function (err) {
            if (err) {
                reject(err);
            }
            let sqlStr = 'select * from MarketClassification';
            let request = new Request(sqlStr, function (err) {
                if (err) {
                    reject(err);
                }
            });
            var MarketClassificationArray = new Array();
            request.on('row', function (columns) {
                let tempMainData = {};
                columns.forEach(function (column) {
                    let tempName = column.metadata.colName;
                    let tempValue = column.value;
                    tempMainData[tempName] = tempValue;
                });
                MarketClassificationArray.push(tempMainData);
            });
            request.on('doneProc', function () {
                mainData.MarketClassificationArray = MarketClassificationArray;
                resolve('get All MarketClassification');
            });
            connection.execSql(request);
        });
    });
};

Util.getAllData = function (username) {
    return new Promise(function (resolve, reject) {
        let connection = new Connection(tediousConfig);
        connection.on('connect', function (err) {
            if (err) {
                reject(err);
            }
            let sqlStr = 'select * from MainData where Username=N\'' + username + '\'';
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
                let currentCount = 0;
                let totalCount = mainDataArray.length;
                mainDataArray.forEach(function (data) {
                    Util.resolveMainData(data).then(() => {
                        currentCount++;
                        if (currentCount === totalCount) {
                            // console.log(mainDataArray);
                            resolve(mainDataArray);
                        }
                    });
                });
            });
            connection.execSql(request);
        });
    });
};
Util.resolveMainData = function (mainData) {
    return new Promise(function (resolve, reject) {
        Promise.all([Util.getReviewer(mainData), Util.getBUDistrict(mainData), Util.getPipelineStatus(mainData),
            Util.getContractTerm(mainData), Util.getTargetRate(mainData), Util.getAssistCAMName(mainData),
            Util.getFollowingStatus(mainData), Util.getCTCBU(mainData), Util.getSalesType(mainData),
            Util.getMarketClassification(mainData),
            // Util.getCompetitorCN(mainData), Util.getMarketClassification(mainData),

            Util.getAllReviewer(mainData), Util.getAllBUDistrict(mainData), Util.getAllPipelineStatus(mainData),
            Util.getAllContractTerm(mainData), Util.getAllTargetRate(mainData), Util.getAllAssistCAMName(mainData),
            Util.getAllFollowingStatus(mainData), Util.getAllCTCBU(mainData), Util.getAllSalesType(mainData),
            Util.getAllCompetitorCN(mainData), Util.getAllMarketClassification(mainData)
        ]).then(value => {
            resolve(value);
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
            let sqlStr = 'update MainData set ReviewerID=' + mainData.ReviewerID + ',' +
                'BUDistrictID=' + mainData.BUDistrictID + ',' +
                // 'OpportunityCode=N\'' + mainData.OpportunityCode + '\',' + no need to update
                'Province=N\'' + mainData.Province + '\',' +
                'City=N\'' + mainData.City + '\',' +
                'Site=N\'' + mainData.Site + '\',' +
                'ChineseName=N\'' + mainData.ChineseName + '\',' +
                'EnglishName=N\'' + mainData.EnglishName + '\',' +
                'PipelineStatusID=' + mainData.PipelineStatusID + ',' +
                'ContractTermID=' + mainData.ContractTermID + ',' +
                'TargetRateID=' + mainData.TargetRateID + ',' +
                'AnnualSales=' + mainData.AnnualSales + ',' +
                'CorporateAccountChinese=N\'' + mainData.CorporateAccountChinese + '\',' +
                'CorporateAccountEnglish=N\'' + mainData.CorporateAccountEnglish + '\',' +
                'SalesRep=N\'' + mainData.SalesRep + '\',' +
                'AssistCAMNameID=' + mainData.AssistCAMNameID + ',' +
                'FollowingStatusID=' + mainData.FollowingStatusID + ',' +
                'CTCBUID=' + mainData.CTCBUID + ',' +
                'CTCSales=N\'' + mainData.CTCSales + '\',' +
                'SalesTypeID=' + mainData.SalesTypeID + ',' +
                'FollowingStatusRemark=N\'' + mainData.FollowingStatusRemark + '\',' +
                'CompetitorCN=N\'' + mainData.CompetitorCN + '\',' +
                // 'FirstCollaborationDate=N\'' + mainData.FirstCollaborationDate + '\',' +
                'FirstCollaborationDate=' + (mainData.FirstCollaborationDate === null ? null : 'N\'' + mainData.FirstCollaborationDate + '\'') + ',' +
                'EstimatedPCO=' + mainData.EstimatedPCO + ',' +
                'Remark=N\'' + mainData.Remark + '\',' +
                'MarketClassificationID=' + mainData.MarketClassificationID +
                ' where ID=' + mainData.ID;
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
Util.saveNewMainData = function (mainData) {
    Util.getOpportunityCode().then(code => {
        mainData.OpportunityCode = code;
    });
    return new Promise(function (resolve, reject) {
        let connection = new Connection(tediousConfig);
        connection.on('connect', function (err) {
            if (err) {
                reject(err);
            }

            // console.log(mainData);
            let sqlStr = 'insert into MainData (ReviewerID, BUDistrictID, OpportunityCode, Province, City, Site, ChineseName, ' +
                'EnglishName, PipelineStatusID, ContractTermID, TargetRateID, AnnualSales, CorporateAccountChinese, CorporateAccountEnglish, ' +
                'SalesRep, AssistCAMNameID, FollowingStatusID, CTCBUID, CTCSales, SalesTypeID, FollowingStatusRemark, CompetitorCN, FirstCollaborationDate, ' +
                'EstimatedPCO, Remark, MarketClassificationID, Username) VALUES (' +
                mainData.ReviewerID + ', ' +
                mainData.BUDistrictID + ', ' +
                'N\'' + mainData.OpportunityCode + '\', ' +
                'N\'' + mainData.Province + '\', ' +
                'N\'' + mainData.City + '\', ' +
                'N\'' + mainData.Site + '\', ' +
                'N\'' + mainData.ChineseName + '\', ' +
                'N\'' + mainData.EnglishName + '\', ' +
                mainData.PipelineStatusID + ', ' +
                mainData.ContractTermID + ', ' +
                mainData.TargetRateID + ', ' +
                mainData.AnnualSales + ', ' +
                'N\'' + mainData.CorporateAccountChinese + '\', ' +
                'N\'' + mainData.CorporateAccountEnglish + '\', ' +
                'N\'' + mainData.SalesRep + '\', ' +
                mainData.AssistCAMNameID + ', ' +
                mainData.FollowingStatusID + ', ' +
                mainData.CTCBUID + ', ' +
                'N\'' + mainData.CTCSales + '\', ' +
                mainData.SalesTypeID + ', ' +
                'N\'' + mainData.FollowingStatusRemark + '\', ' +
                'N\'' + mainData.CompetitorCN + '\', ' +
                'N\'' + mainData.FirstCollaborationDate + '\',' +
                mainData.EstimatedPCO + ',' +
                'N\'' + mainData.Remark + '\',' +
                mainData.MarketClassificationID + ',' +
                'N\'' + mainData.Username + '\'' +
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
                console.log(reaultMainData);
                if (JSON.stringify(reaultMainData) !== '{}') {
                    Util.resolveMainData(reaultMainData).then(value => {
                        resolve(reaultMainData);
                    });
                } else {
                    resolve(null);
                }

            });
            connection.execSql(request);
        });
    });
}
Util.getMetaData = function (metaData) {
    return new Promise(function (resolve, reject) {
        Promise.all([Util.getAllReviewer(metaData), Util.getAllBUDistrict(metaData), Util.getAllPipelineStatus(metaData),
            Util.getAllContractTerm(metaData), Util.getAllTargetRate(metaData), Util.getAllAssistCAMName(metaData),
            Util.getAllFollowingStatus(metaData), Util.getAllCTCBU(metaData), Util.getAllSalesType(metaData),
            Util.getAllCompetitorCN(metaData), Util.getAllMarketClassification(metaData)
            // Util.getReviewer(mainData), Util.getBUDistrict(mainData), Util.getPipelineStatus(mainData),
            // Util.getContractTerm(mainData), Util.getTargetRate(mainData), Util.getAssistCAMName(mainData),
            // Util.getFollowingStatus(mainData), Util.getCTCBU(mainData), Util.getSalesType(mainData),
            // Util.getCompetitorCN(mainData), Util.getMarketClassification(mainData),
        ]).then(value => {
            resolve(metaData);
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

Util.getOpportunityCode = function () {
    return new Promise(function (resolve, reject) {
        let connection = new Connection(tediousConfig);
        connection.on('connect', function (err) {
            if (err) {
                reject(err);
            }

            let tempDate = moment().format("YYYYMMDD");
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
                resolve(code);
            });
            connection.execSql(request);
        });
    });
};
//
// Util.saveNewCompetitorCN = function (CompetitorCNName) {
//     return new Promise(function (resolve, reject) {
//         let connection = new Connection(tediousConfig);
//         connection.on('connect', function (err) {
//             if (err) {
//                 reject(err);
//             }
//             let sqlStr = 'insert into CompetitorCN (Name) VALUES (N\'' + CompetitorCNName + '\') SELECT @@IDENTITY';
//             let request = new Request(sqlStr, function (err) {
//                 if (err) {
//                     reject(err);
//                 }
//             });
//             connection.execSql(request);
//             request.on('row', function (columns) {
//                 columns.forEach(column => {
//                     resolve(column.value);
//                 });
//             });
//         });
//     });
// };
//
// Util.saveNewMainData = function (mainData) {
//     return new Promise(function (resolve, reject) {
//         let connection = new Connection(tediousConfig);
//         connection.on('connect', function (err) {
//             if (err) {
//                 reject(err);
//             }
//             let sqlStr = 'insert into MainData (ReviewerID, BUDistrictID, OpportunityCode, Province, City, Site, ChineseName, ' +
//                 'EnglishName, PipelineStatusID, ContractTermID, TargetRateID, AnnualSales, CorporateAccountChinese, CorporateAccountEnglish, ' +
//                 'SalesRep, AssistCAMNameID, FollowingStatusID, CTCBUID, CTCSales, SalesTypeID, FollowingStatusRemark, CompetitorCNID, FirstCollaborationDate, ' +
//                 'EstimatedPCO, Remark, MarketClassificationID) VALUES (' +
//                 1 + ',' +
//                 1 + ',' +
//                 '\'' + '1314' + '\',' +
//                 '\'' + '香港' + '\',' +
//                 '\'' + '浦东' + '\',' +
//                 '\'' + '蔡伦路' + '\',' +
//                 '\'' + '中文名' + '\',' +
//                 '\'' + 'EnglishName' + '\',' +
//                 1 + ',' +
//                 1 + ',' +
//                 1 + ',' +
//                 998 + ',' +
//                 '\'' + '还是中文名' + '\',' +
//                 '\'' + 'CorporateAccountEnglish' + '\',' +
//                 '\'' + '销售代表' + '\',' +
//                 1 + ',' +
//                 1 + ',' +
//                 1 + ',' +
//                 '\'' + 'CTCSales' + '\',' +
//                 1 + ',' +
//                 '\'' + 'FollowingStatusRemark' + '\',' +
//                 1 + ',' +
//                 '\'' + '2017-06-20' + '\',' +
//                 '\'' + '99%' + '\',' +
//                 '\'' + '备注' + '\',' +
//                 1 +
//                 ')';
//             let request = new Request(sqlStr, function (err) {
//                 if (err) {
//                     reject(err);
//                 }
//             });
//             connection.execSql(request);
//             request.on('doneProc', function (rowCount, more, returnStatus, rows) {
//                 resolve('update success');
//             });
//         });
//     });
// };

module.exports = Util;