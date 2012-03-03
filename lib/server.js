var config = require('./config');
var relax = require('./relaxgtd');

var server = new relax(config);
server.start();