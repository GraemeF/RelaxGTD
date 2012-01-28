var express = require('express');

var app = express.createServer();

app.use(express.logger("dev"));
app.use(express.static(__dirname + '/../ui'));
app.use(express.bodyParser());

app.listen(3004);