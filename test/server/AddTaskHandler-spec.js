sinon = require("sinon");

AddTaskHandler = require("../../lib/AddTaskHandler.js");

describe("AddTaskHandler", function () {
    var repo;
    var command;
    var handler;
    const title = 'Polish the silver';

    beforeEach(function () {
        repo = {store: sinon.spy()};
        command = {
            name: 'addTask',
            data: {
                title: title
            }
        };
        handler = new AddTaskHandler(repo);
    });

    describe('handle an addTask command', function () {
        beforeEach(function () {
            handler.handle(command);
        });

        it('should add the task to the repository', function () {
            sinon.assert.called(repo.store);
        });
    });
});
