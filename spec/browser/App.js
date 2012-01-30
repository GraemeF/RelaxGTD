define(['../../ui/scripts/App', '../../ui/scripts/Service', 'libs/chai'], function (App, Service, chai) {
    var expect = chai.expect;

    describe('App', function () {
        var service;
        var serviceHasTasks = function (tasks) {
            sinon.stub(service, "getTasks").callsArgWith(0, null, tasks);
        };

        beforeEach(function () {
            service = new Service("some uri");
        });

        describe('when the service has no tasks', function () {
            beforeEach(function () {
                serviceHasTasks([]);
            });
            it('has no tasks', function () {
                var app = new App(service);
                expect(app.tasks()).to.be.empty;
            });
        });

        describe('when the service has a task', function () {
            var task = {title: "a task"};
            beforeEach(function () {
                serviceHasTasks([task]);
            });
            it('has a task', function () {
                var app = new App(service);
                expect(app.tasks()).to.have.length(1);
                expect(app.tasks()).to.include(task);
            });
        });
    });
});