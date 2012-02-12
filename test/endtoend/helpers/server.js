spawn = require('child_process').spawn;

var Server = function () {
    var self = this;

    this.start = function () {
        self.commandProcess = spawn("npm", ["start", "--relax-gtd:port", "3005"]);
    };

    this.stop = function (callback) {
        this.commandProcess.on('exit', function () {
            if (typeof(callback) !== 'undefined')
                callback();
        });
        this.commandProcess.kill();
    };
};

module.exports = Server;
