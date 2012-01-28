var vows = require("vows");
var helpers = require('./helpers');
require('chai').should();

var RunningServer = function () {
    var server = new helpers.Server();
    server.start();
    return server;
};

vows.describe('Task').addBatch({
    'when the server is running': {
        topic: RunningServer,
        'I browse to the app':{
          topic:function()
          {

          }
        },
        'I add a task': {
            topic: function () {
                helpers.Task.IsCreatedWithTitle_('do something');
                return 4;
            },
            'the new task is shown':function(x){
                x.should.equal(4);
            }
        },
        teardown: function (server) {
            server.stop();
        }
    }
}).export(module);
/*
 .scenario("Create a new task")
 .given(helpers.Server.HasBeenStarted())
 .when(helpers.Task.IsCreatedWithTitle_('do something'))
 .then(helpers.Task.Task_ShouldBeShown('do something'))
 .complete(helpers.Server.Stop)
 .finish(module);*/
