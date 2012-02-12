var express = require('express');
var config = require('./config');
var RedisStore = require('connect-redis')(express);

var authentication = require('./authentication');
var CommandServer = require('./CommandServer');
var CommandProcessor = require('./CommandProcessor');
var AddTaskHandler = require('./commandHandlers/AddTaskHander');

var server = express.createServer(
    express.bodyParser(),
    express.cookieParser(),
    express.session({store: new RedisStore, secret: config.session.secret}),
    express.static(__dirname + '/../ui')
);

server.set("view options", {layout: false});
server.get('/', function (req, res) {
    res.render('index.ejs');
});

var commandProcessor = new CommandProcessor();
commandProcessor.handlerFactories.addTask = {
    createHandler: function () {
        return new AddTaskHandler();
    }
};

var commandServer = new CommandServer(commandProcessor);
commandServer.attach(server);

authentication.attach(server);

server.listen(config.port);