var express = require('express');

var server = express.createServer(
    express.static(__dirname+"/../..")
);

server.listen(2998);