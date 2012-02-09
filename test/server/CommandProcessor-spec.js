var sinon = require("sinon");
require('chai').should();

var CommandProcessor = require("../../lib/CommandProcessor");

describe("CommandProcessor", function () {
    var processor;

    beforeEach(function () {
        processor = new CommandProcessor();
    });

    describe("with a handler for foo commands", function () {
        var handler;

        beforeEach(function () {
            handler = {
                handle: sinon.spy()
            };

            var fooHandlerFactory = {
                createHandler: function () {
                    return handler;
                }
            };

            sinon.spy(fooHandlerFactory, "createHandler");
            processor.handlerFactories.foo = fooHandlerFactory;
        });

        describe("when handling a foo command", function () {
            var command;

            beforeEach(function () {
                command = {
                    name: "foo",
                    data: "bar"
                };

                processor.handle(command);
            });

            it("should create a foo handler", function () {
                sinon.assert.calledWith(handler.handle, command);
            });
        });

        describe("when handling an unknown command", function () {
            var caughtError;

            beforeEach(function () {
                try {
                    processor.handle({
                        name: "unknown",
                        data: "bar"
                    });
                } catch (error) {
                    caughtError = error;
                }
            });

            it("should throw an error", function () {
                caughtError.message.should.equal("There is no registered handler for 'unknown' commands.");
            });
        });
    });
});