const uiLibsPath = "../../ui/scripts/libs/";

require.config({
    paths: {
        "chai": "libs/chai",
        "knockout": uiLibsPath + "knockout-latest",
        "knockout-onDemand": uiLibsPath + "knockout-onDemand",
        "underscore": "libs/require-underscore"
    } });

require(['App'], function (App) {

    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;

    var trivialReporter = new jasmine.TrivialReporter();

    jasmineEnv.addReporter(trivialReporter);

    jasmineEnv.specFilter = function (spec) {
        return trivialReporter.specFilter(spec);
    };

    jasmineEnv.execute();
});