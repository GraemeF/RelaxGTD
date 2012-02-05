var CommandServer = function (processor) {
    this.processor = processor;
};

CommandServer.prototype.attach = function (server) {
    var theProcessor = this.processor;
    server.post('/commands', function (req, res) {
        if (req.connection != null)
            req.connection.setTimeout(1000);
        theProcessor.handle(req.body);
        return res.send(201);
    });
};

module.exports = CommandServer;
