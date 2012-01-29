define(['jquery'], function ($) {
    var Service = function (baseUri) {
        this.baseUri = baseUri;
    };

    Service.prototype.getTasks = function (callback) {
        callback(null, {});
    };

    return Service;
});