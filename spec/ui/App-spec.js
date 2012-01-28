var vows = require("vows");
var sinon = require("sinon");
require('chai').should();

var knockout = {
    observableArray: sinon.stub()
};
knockout.observableArray.returns(function () {
    return[];
});

var App;

define = function (dependencies, stuff) {
    App = stuff(knockout);
};

require("../../ui/scripts/App.js");

var Service;
define = function (dependencies, stuff) {
    Service = stuff({});
};

require("../../ui/scripts/Service.js");

vows.describe('App').addBatch({
    'when the service has no tasks': {
        topic: function () {
            var service = new Service("x");
            sinon.spy(service, "getTasks");
            return service;
        },
        'I create an App': {
            topic: function (service) {
                return new App(service);
            },
            'I get the tasks': {
                topic: function (app) {
                    return app.tasks();
                },
                'there are no tasks': function (tasks) {
                    tasks.should.be.empty;
                }
            }
        }
    }
}).export(module);
