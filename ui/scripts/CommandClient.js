define(['jquery'], function ($) {
    var CommandService = function (baseUri) {
        this.baseUri = baseUri;
    };

    CommandService.prototype.getTasks = function (callback) {
        callback(null, []);
    };

    CommandService.prototype.send = function (command, callback) {
        $.ajax({
            type: "POST",
            url: this.baseUri + "/commands",
            data: command,
            success: function () {
                callback();
            },
            dataType: "json"
        });
    };

    return CommandService;
});