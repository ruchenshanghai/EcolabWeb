/**
 * Created by wenjin on 2017/6/19.
 */
module.exports = {
    hostname: 'http://localhost',
    port: 2017,
    userName: 'GTW',
    password: 'Ecolabit@123',
    server: 'CNSHASQLSDB01P',
    options: {
        port:1433,
        database: 'GTWPEST',
        encrypt: true,
        // connectTimeout: 50000,
        // requestTimeout: 50000,
        // cancelTimeout: 10000
    }

    // userName: 'Wenja',
    // password: 'Ecolab2017',
    // server: 'ruchenshanghai.database.chinacloudapi.cn',
    // options: {
    //     port:1433,
    //     database: 'GTWPEST',
    //     encrypt: true
    // }

    // userName: 'Wenja', //Username
    // password: 'ecolabECOLAB521', //Password
    // // IntegratedSecurity: true,
    // // domainName: 'ECOLAB.CORP', //Domain
    // server: 'CNSHASQLSDB01P', //Database address
    // options: {
    //     instanceName: '',
    //     database: "GTWPEST",
    //     debug: {
    //         packet: false,
    //         payload: false,
    //         token: false,
    //         data: false
    //     },
    //     // encrypt: false
    // }
};