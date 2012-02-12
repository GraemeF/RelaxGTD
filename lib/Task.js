var _ = require('underscore');

var Task = function (titleOrEvents) {
    this.uncommittedEvents = [];
    if (_.isArray(titleOrEvents)) {
        this.apply(titleOrEvents);
    } else {
        var event = {
            name: "taskCreated",
            data: {
                title: titleOrEvents
            }
        };
        this.apply([event]);
        this.append([event]);
    }
};

Task.prototype.append = function (events) {
    var self = this;
    _.each(events, function (event) {
        self.uncommittedEvents.push(event);
    });
};

Task.prototype.apply = function (events) {
    var self = this;
    _.each(events, function (event) {
        self["apply_" + event.name](event.data);
    });
};

Task.prototype.apply_taskCreated = function (data) {
    this.title = data.title;
};

module.exports = Task;
