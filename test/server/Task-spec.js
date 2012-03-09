Task = require("../../lib/Task");

sinon = require('sinon');

describe('Task', function () {
    describe('when created', function () {
        var task;

        beforeEach(function () {
            task = new Task('4', 'Troop the colour');
        });

        it('has an uncommitted taskAdded event', function () {
            var event = task.uncommittedEvents[0];
            event.name.should.eql('taskAdded');
        });

        it('has matching properties', function () {
            task.id.should.eql('4');
            task.title.should.eql('Troop the colour');
        });
    });

    describe('when rehydrated from events', function () {
        var task;

        beforeEach(function () {
            task = new Task([
                {
                    name: 'taskAdded',
                    data: {
                        id: '6',
                        title: 'Mow lawn'
                    }
                }
            ]);
        });

        it('has no uncommitted events', function () {
            task.uncommittedEvents.should.be.empty;
        });

        it('has matching properties', function () {
            task.id.should.eql('6');
            task.title.should.eql('Mow lawn');
        });
    });
});