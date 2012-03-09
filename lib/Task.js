var _ = require('underscore');

var Task = function (idOrEvents, title) {
    this.uncommittedEvents = [];
    if (_.isArray(idOrEvents)) {
        this.apply(idOrEvents);
    } else {
        var event = {
            name: "taskAdded",
            data: {
                id: idOrEvents,
                title: title
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

Task.prototype.apply_taskAdded = function (data) {
    this.id = data.id;
    this.title = data.title;
};

module.exports = Task;
