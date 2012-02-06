var Browser = require("zombie");
var _ = require("underscore");

RelaxBrowser = function (callback) {
    self = this;
    this.zombie = new Browser({
        runScripts: true,
        site: "http://localhost:3005",
        debug: false,
        userAgent: "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.7 (KHTML, like Gecko) Chrome/16.0.912.59 Safari/535.7"
    });
    this.waitForServerToStart(callback);
};

RelaxBrowser.prototype.waitForServerToStart = function (callback) {
    var self = this;
    setTimeout(function () {
        self.zombie.visit('/', function (e, browser) {
            if (browser.error)
                self.waitForServerToStart(callback);
            else
                callback(e, self);
        });
    }, 100);
};

RelaxBrowser.prototype.createTask = function (title, callback) {
    var self = this;
    this.zombie
        .fill('newTaskTitle', title)
        .pressButton('Add Task', function (e) {
            callback(e, self);
        });
};

RelaxBrowser.prototype.tasks = function () {
    return _.map(this.zombie.queryAll('.task'), function (x) {
        return x.textContent;
    });
};

module.exports = RelaxBrowser;
