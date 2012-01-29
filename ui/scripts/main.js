require.config({
    paths: {
        "knockout": "libs/knockout-latest",
        "knockout-onDemand": "libs/knockout-onDemand"
    }
});

require(["jquery", "knockout", "App", "Service"], function ($, ko, App, Service) {
    $(function () {
        var app = new App(new Service("/"));
    });
});
