define(['jquery'], function ($) {
    var Service = function (baseUri) {
        this.baseUri = baseUri;
    };

    Service.prototype.getTasks = function () {
        throw new Error("todo");
    };

    return Service;
});