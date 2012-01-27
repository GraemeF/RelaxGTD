var browser = require('./browser');
require('chai').should();

character = {
    IsCreatedWithTitle_: function (title) {
        return [
            "task is created with title '" + title + "'",
            function () {
                cb = this.callback;
                return browser.createTask(title, function () {
                    cb();
                });
            }
        ];
    },
    Task_ShouldBeShown : function (title) {
        return [
            "task '" + title + "' should be shown",
            function () {
                browser.taskTitles().should.include(title);
            }
        ];
    }
};

module.exports = character;