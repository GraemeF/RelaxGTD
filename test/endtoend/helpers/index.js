var log;

process.env.NODE_ENV = 'test';

module.exports = {
  RelaxBrowser: require("./browser.js"),
  Task: require("./task.js"),
  Server: require("./server.js")
};
