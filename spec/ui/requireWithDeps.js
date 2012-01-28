var _ = require("underscore");

function requireWithDeps(moduleName, dependencies) {
    var originalDefine;
    if (typeof define !== "undefined") {
        originalDefine = define;
    }

    var moduleExports;
    define = function (deps, callback) {
        var requestedDeps = _(deps).map(function (depName) {
            return dependencies[depName];
        });
        moduleExports = callback.apply(this, requestedDeps);
    };

    require(moduleName);

    define = originalDefine;
    return moduleExports;
}

module.exports = requireWithDeps;