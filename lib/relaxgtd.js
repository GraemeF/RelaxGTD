var express = require('express');
var config = require('./config');
var RedisStore = require('connect-redis')(express);

var authentication = require('./authentication');
var CommandServer = require('./CommandServer');
var CommandProcessor = require('./CommandProcessor');
var AddTaskHandler = require('./AddTaskHandler');
var TaskRepository = require('./TaskRepository');
var InMemoryEventStore = require('./InMemoryEventStore');
var EventPublisher = require('./EventPublisher');

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
throw "ssss"
var eventStore = new InMemoryEventStore();
var eventPublisher = new EventPublisher();
var commandProcessor = new CommandProcessor();
var taskRepository = new TaskRepository(eventStore, eventPublisher);

commandProcessor.handlerFactories.addTask = {
    createHandler: function () {
        return new AddTaskHandler(taskRepository);
    }
};

var commandServer = new CommandServer(commandProcessor);
commandServer.attach(server);
authentication.attach(server);

server.listen(config.port);