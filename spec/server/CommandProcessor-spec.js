var vows = require('vows');
var sinon = require("sinon");
require('chai').should();

var CommandProcessor = require("../../lib/CommandProcessor");

vows.describe("CommandProcessor").addBatch({
    "a command processor": {
        topic: new CommandProcessor(),
        "there is handler for foo commands": {
            topic: function (processor) {
                var fooHandler = {
                    handle: sinon.spy()
                };

                var fooHandlerFactory = {
                    createHandler: function () {
                        return fooHandler;
                    }
                };

                sinon.spy(fooHandlerFactory, "createHandler");
                processor.handlerFactories.foo = fooHandlerFactory;
                return fooHandler;
            },
            "it is asked to handle a known command": {
                topic: function (fooHandler, processor) {
                    var fooCommand = {
                        name: "foo",
                        data: "bar"
                    };

                    processor.handle(fooCommand);
                    return {
                        handler: fooHandler,
                        command: fooCommand};
                },
                "it should create the appropriate handler": function (topic) {
                    return sinon.assert.calledWith(topic.handler.handle, topic.command);
                }
            }
        },
        "it is asked to handle an unknown command": {
            topic: function (processor) {
                try {
                    processor.handle({
                        name: "unknown",
                        data: "bar"
                    });
                } catch (error) {
                    return error;
                }
                return null;
            },
            "it should throw an error": function (error) {
                error.message.should.equal("There is no registered handler for 'unknown' commands.");
            }
        }
    }
}).export(module);