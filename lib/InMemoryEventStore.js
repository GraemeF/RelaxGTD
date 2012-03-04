var _ = require("underscore");

InMemoryEventStore = function () {
    this.events = [];
};

InMemoryEventStore.prototype.append = function (newEvents) {
    var self = this;
    _.each(newEvents, function (event) {
        self.events.push(event);
    });
};

module.exports = InMemoryEventStore;