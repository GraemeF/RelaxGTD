spawn = require('child_process').spawn;

var Server = function () {
    var self = this;

    this.start = function () {
        self.commandProcess = spawn("npm", ["start", "--relax-gtd:port", "3005"]);
        self.commandProcess.stdout.pipe(process.stdout, {
            end: false
        });
        self.commandProcess.stderr.pipe(process.stderr, {
            end: false
        });
        self.commandProcess.on('exit', function (code, signal) {
        });
    };

    this.stop = function () {
        this.commandProcess.kill();
    };
};

module.exports = Server;
