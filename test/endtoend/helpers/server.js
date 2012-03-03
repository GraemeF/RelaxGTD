var config = require('../../../lib/config');
var relax = require('../../../lib/relaxgtd');

var Server = function () {
    var self = this;

    this.start = function () {
        config.port = 3004;
        self.relax = new relax(config);
        self.relax.start();
    };

    this.stop = function () {
        self.relax.stop();
    };
};

module.exports = Server;
