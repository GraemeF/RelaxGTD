var relax = require('../../../lib/relaxgtd');

var config = {
    "port":3005,
    "session":{
        "secret":"lksajdfolweujfla"
    },
    "keys":{
        "twitter":{
            "consumerKey":"WYFmdpXiNAVhTA71PuL2A",
            "consumerSecret":"ijeVVbCSHiqleliPG4GMuBjoeTrbswvZPrhvSDIhk"
        }
    }
};

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