var Feature = require("vows-bdd").Feature;
var Server = require('helpers').Server;
var Task = require('helpers').Task;

Feature("Task", module)
    .scenario("Create a new task")
    .given(Server.HasBeenStarted())
    .when(Task.IsCreatedWithTitle_('do something'))
    .then(Task.Task_ShouldBeShown('do something'))
    .complete(Server.Stop)
    .finish(module);
