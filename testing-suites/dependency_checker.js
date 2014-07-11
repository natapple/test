var DependencyChecker = function() {

    var check = function(mod) {
        var theCheck = true;
        for(var i = 0; i < mod.dependencies.length; i++) {
            var modCheck = modules[mod.dependencies[i]];
            if(!modCheck.testResult) {
                theCheck = false;
                break;
            }
        }
        return theCheck;
    }

    return {
        check: check
    }
}

module.exports = DependencyChecker;
