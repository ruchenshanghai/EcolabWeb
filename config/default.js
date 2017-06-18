module.exports = {
    port: 2017,
    dbconfig: {
        user: 'Wenja',
        password: 'Ecolab2017',
        server: 'CNSHASQLSDB01P',
        database: 'GTWPEST',
        port: 1433,
        options: {
            encrypt: true
        },
        pool: {
            min: 0,
            max: 10,
            idleTimeoutMillis: 3000
        }
    }
};