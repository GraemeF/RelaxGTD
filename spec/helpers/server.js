spawn = require('child_process').spawn;

var runServer = function () {
    var commandProcess;
    commandProcess = spawn("node", ["lib/server"]);
    commandProcess.stdout.pipe(process.stdout, {
        end:false
    });
    commandProcess.stderr.pipe(process.stderr, {
        end:false
    });
    commandProcess.on('exit', function (code, signal) {
        console.log('Server process terminated due to receipt of signal ' + signal);
    });
    console.log("Started", commandProcess);
    return commandProcess;
};
var serverProcess;

module.exports = {
    HasBeenStarted:function () {
        return [
            "server has been started", function () {
                serverProcess = runServer();
                return this.callback();
            }
        ];
    },
    Stop:function () {
        serverProcess.kill();
        this.callback();
    }
};
