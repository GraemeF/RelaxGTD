var vows = require("vows");
var sinon = require("sinon");
var _ = require("underscore");
require('chai').should();

function requireWithDeps(moduleName, dependencies) {
    if (typeof define !== "undefined") {
        throw new Error("define is already defined.")
    }

    var moduleExports;
    define = function (deps, callback) {
        var requestedDeps = _(deps).map(function (depName) {
            return dependencies[depName];
        });
        moduleExports = callback.apply(this, requestedDeps);
    };

    require(moduleName);
    return moduleExports;
}
var knockout = {
    observableArray: sinon.stub()
};
knockout.observableArray.returns(function () {
    return[];
});

var App = requireWithDeps("../../ui/scripts/App.js", {'knockout': knockout});

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
