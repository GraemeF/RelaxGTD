var argv = require('optimist').argv;
var express = require('express');
var CommandServer = require('./CommandServer');

var server = express.createServer();

server.use(express.static(__dirname + '/../ui'));
server.use(express.bodyParser());

var commandServer = new CommandServer();
commandServer.attach(server);

server.listen(argv.port);