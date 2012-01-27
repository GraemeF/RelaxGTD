var log;

process.env.NODE_ENV = 'test';

module.exports = {
  Task: require("task.js"),
  Server: require("server.js")
};
