define(['../../ui/scripts/App', '../../ui/scripts/Service'], function (App, Service) {

    describe('App', function () {
        var service;
        var app;

        var serviceHasTasks = function (tasks) {
            service.getTasks.callsArgWith(0, null, tasks);
            app.serviceTasks.refresh();
        };

        beforeEach(function () {
            service = new Service("some uri");
            sinon.stub(service, "getTasks");
            sinon.spy(service, 'addTask');

            app = new App(service);
        });

        describe('when a task is added', function () {
            beforeEach(function () {
                serviceHasTasks([]);
                app.newTaskTitle("new task");
                app.addTask();
            });

            it('adds the task to the tasks', function () {
                expect(app.tasks()).to.eql([
                    {title: "new task"}
                ]);
            });

            it('sends a task to the server', function () {
                expect(service.addTask.calledWith("new task")).to.be.true;
            });
        });

        describe('when the service has no tasks', function () {
            beforeEach(function () {
                serviceHasTasks([]);
            });
            it('has no tasks', function () {
                expect(app.tasks()).to.be.empty;
            });
        });

        describe('when the service has a task', function () {
            var task = {title: "a task"};
            beforeEach(function () {
                serviceHasTasks([task]);
            });
            it('has a task', function () {
                expect(app.tasks()).to.have.length(1);
                expect(app.tasks()).to.include(task);
            });
        });
    });
});