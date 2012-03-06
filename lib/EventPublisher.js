var events = require('events');
var _ = require('underscore');

var EventPublisher = function () {
    this.emitter = new events.EventEmitter();
};

EventPublisher.prototype.publish = function (publishedEvents) {
    var self = this;
    _.each(publishedEvents, function (event) {
        //console.log("Emitting " + event.name, event.data);
        self.emitter.emit(event.name, event.data);
    });
};

EventPublisher.prototype.subscribe = function (eventName, handler) {
    this.emitter.on(eventName, handler);
};

module.exports = EventPublisher;