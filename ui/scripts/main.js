require.config({
    paths: {
        "knockout": "libs/knockout-latest"
    }
});

require(["jquery", "knockout", "App", "Service"], function ($, ko, App, Service) {
    $(function () {
        var app = new App(new Service("/"));
    });
});
