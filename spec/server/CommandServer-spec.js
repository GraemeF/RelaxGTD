vows = require('vows');
sinon = require("sinon");
express = require("express");

CommandServer = require('../../lib/CommandServer');

CommandProcessor = require('../../lib/CommandProcessor');

vows.describe("CommandServer").addBatch({
    "a command processor": {
        topic: function () {
            var commandProcessor = {"handle": sinon.spy()};
            return commandProcessor;
        },
        "used by a command server": {
            topic: function (commandProcessor) {
                return new CommandServer(commandProcessor);
            },

            "which attaches to a server": {
                topic: function (commandServer) {
                    var server = {post: sinon.spy()};
                    commandServer.attach(server);
                    return server;
                },
                "handles posts to /commands": function (server) {
                    sinon.assert.calledWith(server.post, "/commands");
                },
                "when a command is received": {
                    topic: function (server, commandServer, commandProcessor) {
                        var command = {name: "foo", data: "bar"};
                        var handlerFunc = server.post.lastCall.args[1];
                        handlerFunc({body: command}, {send: sinon.spy()});
                        return {commandProcessor: commandProcessor,
                            command: command};
                    },
                    "tells the command processor to handle the command": function (x) {
                        sinon.assert.calledWith(x.commandProcessor.handle, x.command);
                    }
                }
            }
        }
    }
}).export(module);