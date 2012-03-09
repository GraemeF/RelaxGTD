Task = require('./Task');

var AddTaskHandler = function (repo) {
    this.repo = repo;
};

AddTaskHandler.prototype.handle = function (command) {
    this.repo.store(new Task(command.data.id, command.data.title));
};

module.exports = AddTaskHandler;