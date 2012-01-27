var zombie = require("zombie");
var _ = require("underscore");

var theBrowser = null;

browser = function (callback) {
    if (!(theBrowser != null)) {
        zombie = new zombie.Browser({
            runScripts: true,
            site      : "http://localhost:3004",
            debug     : true,
            userAgent : "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.7 (KHTML, like Gecko) Chrome/16.0.912.59 Safari/535.7"
        });
        return zombie.visit('/', function (err, newBrowser, status) {
            theBrowser = newBrowser;
            return callback(err, newBrowser, status);
        });
    } else {
        return callback(null, theBrowser);
    }
};

module.exports = {
    createTask: function (title, callback) {
        console.log("Creating " + title);
        return browser(function (err, browser) {
            if (err) callback(err, null);
            browser.fill('newTaskTitle', title)
                .pressButton('Add Task', function () {
                    browser.wait(500, callback);
                });
        });
    },
    tasks     : function () {
        console.log("Getting tasks");
        return browser(function (err, browser) {
            if (err) callback(err, null);
            var tasks = _.map(browser.queryAll('.task'), function (x) {
                return x.textContent;
            });
            console.log("Tasks:", tasks);
            return tasks;
        });
    }
};
