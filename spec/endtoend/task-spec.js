var vows = require("vows");
var helpers = require('./helpers');
require('chai').should();

var RunningServer = function () {
    var server = new helpers.Server();
    server.start();
    return server;
};

var BrowserAtApp = function () {
    new helpers.RelaxBrowser(this.callback);
};

vows.describe('Task').addBatch({
    'when the server is running': {
        topic: RunningServer,
        'I browse to the app': {
            topic: BrowserAtApp,
            'I add a task': {
                topic: function (browser) {
                    browser.createTask('do something', this.callback);
                },
                'the new task is shown': function (browser) {
                    browser.tasks().should.include('do something');
                }
            }
        },
        teardown: function (server) {
            server.stop();
        }
    }
}).export(module);
