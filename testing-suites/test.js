/*var casper = require("casper").create({
    verbose: false,
    logLevel: "debug"
});*/

var require = patchRequire(require);

casper.options.waitTimeout = 20000;

var env = require('environment')();
var dependency_checker = require('dependency_checker')();

var page_actions = require('page_actions')();

var homeModule = require('home_test')(true);
var loginModule = require('login_test')(true);
var logoutModule = require('logout_test')(true);
var directoryModule = require('directory_test')(true);
var featuredModule = require('featured_test')(true);
var alltapesModule = require('all_tapes_test')(true);
var exploreModule = require('explore_test')(true);
var userModule = require('user_test')(true);

var modules = {};

env.registerModule(homeModule);
env.registerModule(loginModule);
env.registerModule(logoutModule);
env.registerModule(directoryModule);
env.registerModule(featuredModule);
env.registerModule(alltapesModule);
env.registerModule(exploreModule);
env.registerModule(userModule);

casper.test.on("fail", function(failure) {
    casper.emit('failure');
});

var runTest = function(testModule, numOfTests) {
    if(dependency_checker.check(testModule)) {
        casper.test.begin(testModule.moduleName, numOfTests, function suite(test) {
            testModule.testSeries(casper, test, true);
        });
    } else {
        casper.test.error('Will not run test for test module ', testModule.moduleName, ' because a dependency failed.');
    }
}

runTest(homeModule, 3);
runTest(directoryModule, 9);
runTest(alltapesModule, 7);
runTest(featuredModule, 4);
runTest(exploreModule, 4);
runTest(userModule, 1);
runTest(loginModule, 2);
runTest(logoutModule, 2);