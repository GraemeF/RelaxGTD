sinon = require("sinon");
express = require("express");

CommandServer = require('../../lib/CommandServer');

CommandProcessor = require('../../lib/CommandProcessor');

describe("CommandServer", function () {
    var commandProcessor;
    var commandServer;
    var server;

    beforeEach(function () {
        commandProcessor = {"handle": sinon.spy()};
        commandServer = new CommandServer(commandProcessor);
        server = {post: sinon.spy()};
        commandServer.attach(server);
    });

    it('handles posts to /commands', function () {
        sinon.assert.calledWith(server.post, "/commands");
    });

    describe("when a command is received", function () {
        var command = {name: "foo", data: "bar"};

        beforeEach(function () {
            var handlerFunc = server.post.lastCall.args[1];
            handlerFunc({body: command}, {send: sinon.spy()});
        });

        it("tells the command processor to handle the command", function () {
            sinon.assert.calledWith(commandProcessor.handle, command);
        });
    });

});