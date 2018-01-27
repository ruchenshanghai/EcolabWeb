var fs = require('fs');
var obj = JSON.parse(fs.readFileSync('./test.json'));
var Util = require('./lib/Util');
for (let index in obj) {
  Util.insertMainData(obj[index]);
}