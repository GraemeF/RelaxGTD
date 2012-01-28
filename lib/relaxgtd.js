var argv = require('optimist').argv;
var express = require('express');

var app = express.createServer();

app.use(express.static(__dirname + '/../ui'));
app.use(express.bodyParser());

app.listen(argv.port);