/**
 * Created by wenjin on 2017/6/18.
 */
const sql = require('mssql');
var MainData = require('../model/MainData');

var tediousConfig = require('../config/tedious-config');
var TYPES = require('tedious').TYPES;
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

function Util() {
    console.log('Util initial');
};


Util.getReviewer = function (mainData, callback) {
    console.log('ReviewerID: ' + mainData.ReviewerID);
    let connection = new Connection(tediousConfig);
    connection.on('connect', function (err) {
        if (err) {
            return callback(err);
        }
        let sqlStr = 'select * from Reviewer where ID=' + mainData.ReviewerID;
        let request = new Request(sqlStr, function (err) {
            if (err) {
                console.log(err);
                return callback(err);
            }
        });
        request.on('row', function (columns, idx) {
            columns.forEach(function (column) {
                switch (column.metadata.colName) {
                    case 'ID': {
                        console.log('ID: ' + column.value);
                    }
                        break;
                    case 'Name': {
                        console.log('Name: ' + column.value);
                        mainData.ReviewerName = column.value;
                        return callback(null);
                    }
                        break;
                }
            });
        });
        connection.execSql(request);
    });
};
Util.getBUDistrict = function (mainData, callback) {
    console.log('BUDistrictID: ' + mainData.BUDistrictID);
    let connection = new Connection(tediousConfig);
    connection.on('connect', function (err) {
        if (err) {
            return callback(err);
        }
        let sqlStr = 'select * from BUDistrict where ID=' + mainData.BUDistrictID;
        let request = new Request(sqlStr, function (err) {
            if (err) {
                console.log(err);
                return callback(err);
            }
        });
        request.on('row', function (columns, idx) {
            columns.forEach(function (column) {
                switch (column.metadata.colName) {
                    case 'ID': {
                        console.log('ID: ' + column.value);
                    }
                        break;
                    case 'Name': {
                        console.log('Name: ' + column.value);
                        mainData.BUDistrictName = column.value;
                        return callback(null);
                    }
                        break;
                }
            });
        });
        connection.execSql(request);
    });
};
Util.getPipelineStatus = function (mainData, callback) {
    console.log('PipelineStatusID: ' + mainData.PipelineStatusID);
    let connection = new Connection(tediousConfig);
    connection.on('connect', function (err) {
        if (err) {
            return callback(err);
        }
        let sqlStr = 'select * from PipelineStatus where ID=' + mainData.PipelineStatusID;
        let request = new Request(sqlStr, function (err) {
            if (err) {
                console.log(err);
                return callback(err);
            }
        });
        request.on('row', function (columns, idx) {
            columns.forEach(function (column) {
                switch (column.metadata.colName) {
                    case 'ID': {
                        console.log('ID: ' + column.value);
                    }
                        break;
                    case 'Detail': {
                        console.log('Detail: ' + column.value);
                        mainData.PipelineStatusDetail = column.value;
                        return callback(null);
                    }
                        break;
                }
            });
        });
        connection.execSql(request);
    });
};
Util.getContractTerm = function (mainData, callback) {
    console.log('ContractTermID: ' + mainData.ContractTermID);
    let connection = new Connection(tediousConfig);
    connection.on('connect', function (err) {
        if (err) {
            return callback(err);
        }
        let sqlStr = 'select * from ContractTerm where ID=' + mainData.ContractTermID;
        let request = new Request(sqlStr, function (err) {
            if (err) {
                console.log(err);
                return callback(err);
            }
        });
        request.on('row', function (columns, idx) {
            columns.forEach(function (column) {
                switch (column.metadata.colName) {
                    case 'ID': {
                        console.log('ID: ' + column.value);
                    }
                        break;
                    case 'Detail': {
                        console.log('Detail: ' + column.value);
                        mainData.ContractTermDetail = column.value;
                        return callback(null);
                    }
                        break;
                }
            });
        });
        connection.execSql(request);
    });
};
Util.getTargetRate = function (mainData, callback) {
    console.log('TargetRateID: ' + mainData.TargetRateID);
    let connection = new Connection(tediousConfig);
    connection.on('connect', function (err) {
        if (err) {
            return callback(err);
        }
        let sqlStr = 'select * from TargetRate where ID=' + mainData.TargetRateID;
        let request = new Request(sqlStr, function (err) {
            if (err) {
                console.log(err);
                return callback(err);
            }
        });
        request.on('row', function (columns, idx) {
            columns.forEach(function (column) {
                switch (column.metadata.colName) {
                    case 'ID': {
                        console.log('ID: ' + column.value);
                    }
                        break;
                    case 'Detail': {
                        console.log('Detail: ' + column.value);
                        mainData.TargetRateDetail = column.value;
                        return callback(null);
                    }
                        break;
                }
            });
        });
        connection.execSql(request);
    });
};
Util.getAssistCAMName = function (mainData, callback) {
    console.log('AssistCAMNameID: ' + mainData.AssistCAMNameID);
    let connection = new Connection(tediousConfig);
    connection.on('connect', function (err) {
        if (err) {
            return callback(err);
        }
        let sqlStr = 'select * from AssistCAMName where ID=' + mainData.AssistCAMNameID;
        let request = new Request(sqlStr, function (err) {
            if (err) {
                console.log(err);
                return callback(err);
            }
        });
        request.on('row', function (columns, idx) {
            columns.forEach(function (column) {
                switch (column.metadata.colName) {
                    case 'ID': {
                        console.log('ID: ' + column.value);
                    }
                        break;
                    case 'Detail': {
                        console.log('Detail: ' + column.value);
                        mainData.AssistCAMNameDetail = column.value;
                    }
                        break;
                }
            });
        });
        connection.execSql(request);
        request.on('doneProc', function () {
            return callback(null);
        });
    });
};
Util.getFollowingStatus = function (mainData, callback) {
    console.log('FollowingStatusID: ' + mainData.FollowingStatusID);
    let connection = new Connection(tediousConfig);
    connection.on('connect', function (err) {
        if (err) {
            return callback(err);
        }
        let sqlStr = 'select * from FollowingStatus where ID=' + mainData.FollowingStatusID;
        let request = new Request(sqlStr, function (err) {
            if (err) {
                console.log(err);
                return callback(err);
            }
        });
        request.on('row', function (columns, idx) {
            columns.forEach(function (column) {
                switch (column.metadata.colName) {
                    case 'ID': {
                        console.log('ID: ' + column.value);
                    }
                        break;
                    case 'Detail': {
                        console.log('Detail: ' + column.value);
                        mainData.FollowingStatusDetail = column.value;
                        return callback(null);
                    }
                        break;
                }
            });
        });
        connection.execSql(request);
    });
};
Util.getCTCBU = function (mainData, callback) {
    console.log('CTCBUID: ' + mainData.CTCBUID);
    let connection = new Connection(tediousConfig);
    connection.on('connect', function (err) {
        if (err) {
            return callback(err);
        }
        let sqlStr = 'select * from CTCBU where ID=' + mainData.CTCBUID;
        let request = new Request(sqlStr, function (err) {
            if (err) {
                console.log(err);
                return callback(err);
            }
        });
        request.on('row', function (columns, idx) {
            columns.forEach(function (column) {
                switch (column.metadata.colName) {
                    case 'ID': {
                        console.log('ID: ' + column.value);
                    }
                        break;
                    case 'Name': {
                        console.log('Name: ' + column.value);
                        mainData.CTCBUName = column.value;
                        return callback(null);
                    }
                        break;
                }
            });
        });
        connection.execSql(request);
    });
};
Util.getSalesType = function (mainData, callback) {
        console.log('SalesTypeID: ' + mainData.SalesTypeID);
        let connection = new Connection(tediousConfig);
        connection.on('connect', function (err) {
            if (err) {
                return callback(err);
            }
            let sqlStr = 'select * from SalesType where ID=' + mainData.SalesTypeID;
            let request = new Request(sqlStr, function (err) {
                if (err) {
                    console.log(err);
                    return callback(err);
                }
            });
            request.on('row', function (columns, idx) {
                columns.forEach(function (column) {
                    switch (column.metadata.colName) {
                        case 'ID': {
                            console.log('ID: ' + column.value);
                        }
                            break;
                        case 'Name': {
                            console.log('Name: ' + column.value);
                            mainData.SalesTypeName = column.value;
                            return callback(null);
                        }
                            break;
                    }
                });
            });
            connection.execSql(request);
        });
    };
Util.getCompetitorCN = function (mainData, callback) {
    console.log('CompetitorCNID: ' + mainData.CompetitorCNID);
    let connection = new Connection(tediousConfig);
    connection.on('connect', function (err) {
        if (err) {
            return callback(err);
        }
        let sqlStr = 'select * from CompetitorCN where ID=' + mainData.CompetitorCNID;
        let request = new Request(sqlStr, function (err) {
            if (err) {
                console.log(err);
                return callback(err);
            }
        });
        request.on('row', function (columns, idx) {
            columns.forEach(function (column) {
                switch (column.metadata.colName) {
                    case 'ID': {
                        console.log('ID: ' + column.value);
                    }
                        break;
                    case 'Name': {
                        console.log('Name: ' + column.value);
                        mainData.CompetitorCNName = column.value;
                        return callback(null);
                    }
                        break;
                }
            });
        });
        connection.execSql(request);
    });
};
Util.getMarketClassification = function (mainData, callback) {
    console.log('MarketClassificationID: ' + mainData.MarketClassificationID);
    let connection = new Connection(tediousConfig);
    connection.on('connect', function (err) {
        if (err) {
            return callback(err);
        }
        let sqlStr = 'select * from MarketClassification where ID=' + mainData.MarketClassificationID;
        let request = new Request(sqlStr, function (err) {
            if (err) {
                console.log(err);
                return callback(err);
            }
        });
        request.on('row', function (columns, idx) {
            columns.forEach(function (column) {
                switch (column.metadata.colName) {
                    case 'ID': {
                        console.log('ID: ' + column.value);
                    }
                        break;
                    case 'Name': {
                        console.log('Name: ' + column.value);
                        mainData.MarketClassificationName = column.value;
                        return callback(null);
                    }
                        break;
                }
            });
        });
        connection.execSql(request);
    });
};

Util.getAllData = function () {
    // sql.connect(dbconfig).then(function () {
    //     new sql.Request()
    //         .query('select * from MainData', reviewerID).then(function (recordSet) {
    //         var mainDataArray = new Array();
    //         recordSet.forEach(function (record) {
    //             this.resolveMainData(record);
    //             mainDataArray.push(record);
    //         })
    //         return mainDataArray;
    //     }).catch(function (err) {
    //         console.log(err);
    //     });
    // }).catch(function (err) {
    //     console.log(err);
    // });
};

Util.resolveMainData = function (mainData, callback) {
    Util.getReviewer(mainData, function (err) {
        if (err) {
            console.log('getReviewer error');
            return callback(err);
        }
        console.log('ReviewerName: ' + mainData.ReviewerName);

        Util.getBUDistrict(mainData, function (err) {
            if (err) {
                console.log('getBUDistrict error');
                return callback(err);
            }
            console.log('BUDistrictName: ' + mainData.BUDistrictName);

            Util.getPipelineStatus(mainData, function (err) {
                if (err) {
                    console.log('getPipelineStatus error');
                    return callback(err);
                }
                console.log('PipelineStatusDetail: ' + mainData.PipelineStatusDetail);

                Util.getContractTerm(mainData, function (err) {
                    if (err) {
                        console.log('getContractTerm error');
                        return callback(err);
                    }
                    console.log('ContractTermDetail: ' + mainData.ContractTermDetail);

                    Util.getTargetRate(mainData, function (err) {
                        if (err) {
                            console.log('getTargetRate error');
                            return callback(err);
                        }
                        console.log('TargetRateDetail: ' + mainData.TargetRateDetail);

                        // // 选填？
                        Util.getAssistCAMName(mainData, function (err) {
                            if (err) {
                                console.log('getAssistCAMName error');
                                return callback(err);
                            }
                            console.log('AssistCAMNamDetail: ' + mainData.AssistCAMNameDetail);

                            Util.getFollowingStatus(mainData, function (err, detail) {
                                if (err) {
                                    console.log('getFollowingStatus error');
                                    return callback(err);
                                }
                                console.log('FollowingStatusDetail: ' + mainData.FollowingStatusDetail);

                                Util.getCTCBU(mainData, function (err, detail) {
                                    if (err) {
                                        console.log('getCTCBU error');
                                        return callback(err);
                                    }
                                    console.log('CTCBUName: ' + mainData.CTCBUName);

                                    Util.getSalesType(mainData, function (err, detail) {
                                        if (err) {
                                            console.log('getSalesType error');
                                            return callback(err);
                                        }
                                        console.log('SalesTypeName: ' + mainData.SalesTypeName);

                                        Util.getCompetitorCN(mainData, function (err, detail) {
                                            if (err) {
                                                console.log('getCompetitorCN error');
                                                return callback(err);
                                            }
                                            console.log('CompetitorCNName: ' + mainData.CompetitorCNName);

                                            Util.getMarketClassification(mainData, function (err, detail) {
                                                if (err) {
                                                    console.log('getMarketClassification error');
                                                    return callback(err);
                                                }
                                                console.log('MarketClassificationName: ' + mainData.MarketClassificationName);
                                                return callback(null);
                                            });
                                        });
                                    });
                                });
                            });
                        });

                    });

                });

            });

        });

    });
};

Util.updataMainData = function (mainData, callback) {
    let connection = new Connection(tediousConfig);
    connection.on('connect', function (err) {
        if (err) {
            return callback(err);
        }
        let sqlStr = 'update MainData set ReviewerID=' +  mainData.ReviewerID + ',' +
            'BUDistrictID=' + mainData.BUDistrictID + ',' +
            'OpportunityCode=\'' + mainData.OpportunityCode + '\',' +
            'Province=\'' + mainData.Province + '\',' +
            // 'City=' + mainData.City + ',' +
            // 'Site=' + mainData.Site + ',' +
            // 'ChineseName=' + mainData.ChineseName + ',' +
            // 'EnglishName=' + mainData.EnglishName + ',' +
            // 'PipelineStatusID=' + mainData.PipelineStatusID + ',' +
            // 'ContractTermID=' + mainData.ContractTermID + ',' +
            // 'TargetRateID=' + mainData.TargetRateID + ',' +
            // 'AnnualSales=' + mainData.AnnualSales + ',' +
            // 'CorporateAccountChinese=' + mainData.CorporateAccountChinese + ',' +
            // 'CorporateAccountEnglish=' + mainData.CorporateAccountEnglish + ',' +
            // 'SalesRep=' + mainData.SalesRep + ',' +
            // 'AssistCAMNameID=' + mainData.AssistCAMNameID + ',' +
            // 'FollowingStatusID=' + mainData.FollowingStatusID + ',' +
            // 'CTCBUID=' + mainData.CTCBUID + ',' +
            // 'CTCSales=' + mainData.CTCSales + ',' +
            // 'SalesTypeID=' + mainData.SalesTypeID + ',' +
            // 'FollowingStatusRemark=' + mainData.FollowingStatusRemark + ',' +
            // 'CompetitorCNID=' + mainData.CompetitorCNID + ',' +
            // 'FirstCollaborationDate=' + mainData.FirstCollaborationDate + ',' +
            // 'EstimatedPCO=' + mainData.EstimatedPCO + ',' +
            // 'Remark=' + mainData.Remark + ',' +
            'MarketClassificationID=' + mainData.MarketClassificationID +
            ' where ID=' + mainData.ID;
        let request = new Request(sqlStr, function (err) {
            if (err) {
                console.log(err);
                return callback(err);
            }
        });
        connection.execSql(request);
    });
}

Util.saveNewMainData = function (mainData, callback) {
    
}

module.exports = Util;