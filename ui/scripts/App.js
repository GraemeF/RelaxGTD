define(['underscore', 'knockout', 'knockout-onDemand'], function (_, ko) {

    var App = function (service) {
        this.service = service;
        this.serviceTasks = ko.onDemandObservableArray(this.getTasks, this);
        this.pendingTasks = ko.observableArray();
        this.newTaskTitle = ko.observable();

        this.tasks = ko.computed(function () {
            return _.union(this.pendingTasks(), this.serviceTasks());
        }, this);
    };

    App.prototype.getTasks = function () {
        var self = this;
        this.service.getTasks(function (error, data) {
            if (error !== null)
                throw error;

            self.serviceTasks(data);
        });
    };

    App.prototype.addTask = function () {
        var self = this;
        var title = this.newTaskTitle();
        this.pendingTasks.push({title: title});
        this.service.addTask(title, function (error, data) {
            if (error !== null)
                throw error;
        });
    };

    return App;
});