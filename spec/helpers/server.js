spawn = require('child_process').spawn;

var Server = function () {
    var self = this;

    this.start = function () {
        self.commandProcess = spawn("node", ["lib/relaxgtd"]);
        self.commandProcess.stdout.pipe(process.stdout, {
            end: false
        });
        self.commandProcess.stderr.pipe(process.stderr, {
            end: false
        });
        self.commandProcess.on('exit', function (code, signal) {
            //console.log('Server process terminated due to receipt of signal ' + signal);
        });
        //console.log("Started process " + self.commandProcess.pid);
    };

    this.stop = function () {
        //console.log("Killing process " + self.commandProcess.pid);
        this.commandProcess.kill();
    };
};

module.exports = Server;
