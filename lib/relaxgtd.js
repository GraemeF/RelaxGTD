var express = require('express');
var RedisStore = require('connect-redis')(express);
var authentication = require('./authentication');
var CommandServer = require('./CommandServer');
var CommandProcessor = require('./CommandProcessor');
var AddTaskHandler = require('./AddTaskHandler');
var TaskRepository = require('./TaskRepository');
var InMemoryEventStore = require('./InMemoryEventStore');
var EventPublisher = require('./EventPublisher');

module.exports = function (config) {
    var self = this;
    this.config = config;

    this.server = express.createServer(
        express.bodyParser(),
        express.cookieParser(),
        express.session({store: new RedisStore, secret: this.config.session.secret}),
        express.static(__dirname + '/../ui')
    );

    this.server.set("view options", {layout: false});
    this.server.get('/', function (req, res) {
        res.render('index.ejs');
    });

    this.eventStore = new InMemoryEventStore();
    this.eventPublisher = new EventPublisher();
    this.taskRepo = new TaskRepository(this.eventStore, this.eventPublisher);

    var commandProcessor = new CommandProcessor();
    commandProcessor.handlerFactories.addTask = {
        createHandler: function () {
            return new AddTaskHandler(self.taskRepo, self.eventStore);
        }
    };

    var commandServer = new CommandServer(commandProcessor);
    commandServer.attach(this.server);

    this.start = function () {
        authentication.attach(self.server, self.config);
        console.log("Listening on ", self.config.port);
        self.server.listen(self.config.port);
    };
    this.stop = function () {
        console.log("Closing ", self.config.port);
        self.server.close();
    };
};
