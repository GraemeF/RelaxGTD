const uiLibsPath = "../../ui/scripts/libs/";

require.config({
    paths: {
        "knockout": uiLibsPath + "knockout-latest",
        "knockout-onDemand": uiLibsPath + "knockout-onDemand",
        "underscore": "libs/require-underscore"
    } });

require(['App', 'jquery'], function (App, $) {
    $(function () {
        mocha.run();
    })
});