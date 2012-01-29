define(['App', 'Service', 'chai'], function (App, Service, chai) {
    var expect = chai.expect;

    describe('App', function () {
        describe('when the service has no tasks', function () {
            var service;
            beforeEach(function () {
                service = new Service("some uri");
                sinon.stub(service, "getTasks").returns([]);
            });
            it('has no tasks', function () {
                var app = new App(service);
                expect(app.tasks()).to.be.empty;
            });

        });
    });
});