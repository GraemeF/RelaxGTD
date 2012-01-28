var Feature = require("vows-bdd").Feature;
var helpers = require('./helpers');

Feature("Task", module)
    .scenario("Create a new task")
    .given(helpers.Server.HasBeenStarted())
    .when(helpers.Task.IsCreatedWithTitle_('do something'))
    .then(helpers.Task.Task_ShouldBeShown('do something'))
    .complete(helpers.Server.Stop)
    .finish(module);
