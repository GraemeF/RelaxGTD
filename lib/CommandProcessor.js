function CommandProcessor() {
    this.handlerFactories = {};
}

CommandProcessor.prototype.handle = function (command) {

    var factory = this.handlerFactories[command.name];
    if (factory != null) {
        var handler = factory.createHandler();
        return handler.handle(command);
    } else {
        throw new Error("There is no registered handler for '" + command.name + "' commands.");
    }
};

module.exports = CommandProcessor;
