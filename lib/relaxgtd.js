var express = require('express');
var argv = require('optimist').argv;
var config = require(process.cwd() + '/' + argv.config);

var authentication = require('./authentication');
var CommandServer = require('./CommandServer');
var CommandProcessor = require('./CommandProcessor');

var server = express.createServer(
    express.bodyParser(),
    express.cookieParser(),
    express.session({secret: config.session.secret}),
    express.static(__dirname + '/../ui')
);

server.set("view options", {layout: false});
server.get('/', function (req, res) {
    res.render('index.ejs');
});

var commandServer = new CommandServer(new CommandProcessor());
commandServer.attach(server);

authentication.attach(server);

server.listen(config.port);