var argv = require('optimist').argv;
var express = require('express');

var app = express.createServer();

app.use(express.logger("dev"));
app.use(express.static(__dirname + '/../ui'));
app.use(express.bodyParser());

console.log("Listening on port " + argv.port);
app.listen(argv.port);