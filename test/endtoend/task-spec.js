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
        const title = 'do something';

        beforeEach(function (done) {
            browser.createTask(title, done);
        });

        it('displays the new task', function () {
            browser.tasks().should.include(title);
        });

        describe('I reload the app', function () {
            beforeEach(function (done) {
                browser = new helpers.RelaxBrowser(done);
            });

            it('still displays the new task', function () {
                browser.tasks().should.include(title);
            });
        });
    });

    afterEach(function () {
        server.stop();
    });
});