var helpers = require('./helpers');
require('chai').should();

describe('Task', function () {
    var server;
    var browser;

    beforeEach(function (done) {
        server = new helpers.Server();
        server.start();
        browser = new helpers.RelaxBrowser(done);
    });

    describe('I add a task', function () {
        beforeEach(function (done) {
            browser.createTask('do something', done);
        });

        it('displays the new task', function () {
            browser.tasks().should.include('do something');
        });
    });

    afterEach(function () {
        server.stop();
    });
});