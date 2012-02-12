define(['jquery'], function ($) {
    var CommandService = function (baseUri) {
        this.baseUri = baseUri;
    };

    CommandService.prototype.getTasks = function (callback) {
        callback(null, []);
    };

    CommandService.prototype.send = function (title) {

    };

    return CommandService;
});