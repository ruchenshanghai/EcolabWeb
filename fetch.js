var Util = require('./lib/Util');
var fs = require('fs');
Util.getAdminData().then(data => {
  fs.writeFileSync('./gtw-backup.json', JSON.stringify(data));
})