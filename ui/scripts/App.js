define(['knockout'], function (ko) {
    var App = function (service) {
        this.service = service;
        this.tasks = ko.observableArray();
    };
    return App;
});