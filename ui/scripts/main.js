require.config({
    paths: {
        "knockout": "libs/knockout-latest",
        "knockout-onDemand": "libs/knockout-onDemand",
        "underscore": "libs/require-underscore"
    }
});

require(["jquery", "knockout", "App", "Service"], function ($, ko, App, Service) {
    $(function () {
        var app = new App(new Service("/"));
        ko.applyBindings(app);
    });
});
