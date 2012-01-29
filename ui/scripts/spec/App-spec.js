define(['App', 'Service', 'chai'], function (App, Service, chai) {
    var expect = chai.expect;

    describe('App', function () {
        describe('when the service has no tasks', function () {
            var service;
            beforeEach(function () {
                service = new Service("some uri");
                sinon.stub(service, "getTasks").callsArgWith(0, null, []);
            });
            it('has no tasks', function () {
                var app = new App(service);
                expect(app.tasks()).to.be.empty;
            });
        });

        describe('when the service has a task', function () {
            var service;
            var task = {title: "a task"};
            beforeEach(function () {
                service = new Service("some uri");
                sinon.stub(service, "getTasks").callsArgWith(0, null, [task]);
            });
            it('has a task', function () {
                var app = new App(service);
                expect(app.tasks()).to.have.length(1);
                expect(app.tasks()).to.include(task);
            });
        });
    });
});