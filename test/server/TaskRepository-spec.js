sinon = require("sinon");

TaskRepository = require("../../lib/TaskRepository");

describe('TaskRepository', function () {
    var repo;
    var eventStore;
    var eventPublisher;

    beforeEach(function () {
        eventStore = {append: sinon.spy()};
        eventPublisher = {publish: sinon.spy()};
        repo = new TaskRepository(eventStore, eventPublisher);
    });

    describe('when a task is added', function () {
        var task;
        const uncommittedEvents = [
            {name: 'a'},
            {name: 'b'},
            {name: 'c'}
        ];

        beforeEach(function () {
            task = {
                id: '1',
                uncommittedEvents: uncommittedEvents
            };
            repo.store(task);
        });

        it('should append the task\'s uncommitted events to the event store', function () {
            sinon.assert.calledWith(eventStore.append, uncommittedEvents);
        });

        it('should publish the task\'s uncommitted events', function () {
            sinon.assert.calledWith(eventPublisher.publish, uncommittedEvents);
        });
    });
});