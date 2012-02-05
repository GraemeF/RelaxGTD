spawn = require('child_process').spawn;

var Server = function () {
    var self = this;

    this.start = function () {
        self.commandProcess = spawn("node", ["lib/relaxgtd", "--config=config.json"]);
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
