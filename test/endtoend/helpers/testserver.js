var relax = require('../../../lib/relaxgtd');
var config = require('../../../lib/config');
config.port = 3006;

var Server = function () {
    var self = this;

    this.start = function () {
        self.relax = new relax(config);
        self.relax.start();
    };

    this.stop = function () {
        self.relax.stop();
    };
};

module.exports = Server;