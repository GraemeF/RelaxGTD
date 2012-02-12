require.config({
    paths: {
        "knockout": "libs/knockout-latest",
        "knockout-onDemand": "libs/knockout-onDemand",
        "underscore": "libs/require-underscore"
    }
});

require(["jquery", "knockout", "App", "CommandService"],
    function ($, ko, App, CommandService) {
        $(function () {
            var app = new App(new CommandService("/"));
            ko.applyBindings(app);
        });
    });
