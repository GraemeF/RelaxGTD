var vows = require("vows");
var sinon = require("sinon");
var App = require("../../ui/scripts/App.js");
var Service = require("../../ui/scripts/Service.js");

require('chai').should();

vows.describe('App').addBatch({
    'when the service has no tasks': {
        topic: function () {
            var service = new Service();
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
                    tasks.should.be.empty();
                }
            }
        }
    }
}).export(module);
