define(['knockout', 'knockout-onDemand'], function (ko) {

    var App = function (service) {
        this.service = service;
        this.tasks = ko.onDemandObservableArray(this.getTasks, this);
    };

    App.prototype.getTasks = function () {
        var self = this;
        this.service.getTasks(function (error, data) {
            if (error !== null)
                throw error;

            self.tasks(data);
        });
    };

    return App;
});