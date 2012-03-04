var relax = require('../../../lib/relaxgtd');

var config = {
    "port":3005,
    "session":{
        "secret":"testing is fun"
    },
    "keys":{
        "twitter":{
            "consumerKey":"process.env.npm_package_config_twitterConsumerKey",
            "consumerSecret":"process.env.npm_package_config_twitterConsumerSecret"
        }
    }
};

var Server = function () {
    var self = this;

    this.start = function () {
        config.port = 3005;
        self.relax = new relax(config);
        self.relax.start();
    };

    this.stop = function () {
        self.relax.stop();
    };
};

module.exports = Server;
