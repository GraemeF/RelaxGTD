require.config({
    paths: {
        "knockout": "libs/knockout-latest",
        "knockout-onDemand": "libs/knockout-onDemand",
        "underscore": "libs/require-underscore"
    }
});

require(["jquery", "knockout", "App", "CommandClient"],
    function ($, ko, App, CommandClient) {
        $(function () {
            var app = new App(new CommandClient("/"));
            ko.applyBindings(app);
        });
    });
