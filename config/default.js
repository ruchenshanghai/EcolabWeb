/**
 * Created by wenjin on 2017/6/19.
 */
module.exports = {
  hostname: 'http://cnshafinaap01p',
  port: 2017,
  userName: 'GTW',
  password: 'Ecolabit@123',
  server: 'CNSHASQLSDB01P',
  options: {
    port: 1433,
    database: 'GTWPEST',
    encrypt: true,
  },
  ntlmConfig: {
    userName: 'wenja',
    domainName: "ECOLAB.CORP",
    password: 'ecolab123@',
    server: 'CNSHASQLSDB01P',
    options: {
      database: "GTWPEST",
      debug: {
        packet: false,
        payload: false,
        token: false,
        data: false
      },
      encrypt: true
    }
  }
};