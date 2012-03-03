var express = require('express');
var RedisStore = require('connect-redis')(express);
var authentication = require('./authentication');
var CommandServer = require('./CommandServer');
var CommandProcessor = require('./CommandProcessor');
var AddTaskHandler = require('./AddTaskHandler');

module.exports = function (config) {
    var self = this;
    this.config = config;

    this.server = express.createServer(
        express.bodyParser(),
        express.cookieParser(),
        express.session({store:new RedisStore, secret:this.config.session.secret}),
        express.static(__dirname + '/../ui')
    );

    this.server.set("view options", {layout:false});
    this.server.get('/', function (req, res) {
        res.render('index.ejs');
    });

    var commandProcessor = new CommandProcessor();
    commandProcessor.handlerFactories.addTask = {
        createHandler:function () {
            return new AddTaskHandler();
        }
    };

    var commandServer = new CommandServer(commandProcessor);
    commandServer.attach(this.server);

    authentication.attach(this.server);

    this.start = function () {
        self.server.listen(self.config.port);
    }
    this.stop = function () {
        self.server.close();
    }
};
