require.config({
    baseUrl: "scripts",
    paths: {
        "chai": "libs/chai",
        "knockout": "libs/knockout-latest"
    } });

require(['spec/App-spec'], function (App) {

    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;

    var trivialReporter = new jasmine.TrivialReporter();

    jasmineEnv.addReporter(trivialReporter);

    jasmineEnv.specFilter = function (spec) {
        return trivialReporter.specFilter(spec);
    };

    jasmineEnv.execute();
});