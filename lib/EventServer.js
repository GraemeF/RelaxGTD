function EventServer(server, eventStore) {
    var self = this;
    this.server = server;
    this.eventStore = eventStore;
    this.hasConnection = false;
    this.server.sockets.on("connection", function () {
        return self.hasConnection = true;
    });
}

EventServer.prototype.waitForConnection = function (callback) {
    var self = this;
    if (!this.hasConnection) {
        return process.nextTick(function () {
            return self.waitForConnection(callback);
        });
    } else {
        return callback();
    }
};

EventServer.prototype.publish = function (eventName) {
    var self = this;
    this.eventStore.subscribe(eventName, function (data) {
        self.server.sockets.emit(eventName, data);
    });
};

EventServer.prototype.publishDomainEvents = function () {
    var eventName, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = allEvents.length; _i < _len; _i++) {
        eventName = allEvents[_i];
        _results.push(this.publish(eventName));
    }
    return _results;
};

module.exports = EventServer;
