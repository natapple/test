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
var signupModule = require('signup_test')(true);
var logoutModule = require('logout_test')(true);
var directoryModule = require('directory_test')(true);
var featuredModule = require('featured_test')(true);
var alltapesModule = require('all_tapes_test')(true);
var exploreModule = require('explore_test')(true);
var userModule = require('user_test')(true);

var modules = {};

env.registerModule(homeModule);
env.registerModule(loginModule);
env.registerModule(signupModule);
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

runTest(loginModule, 6);
runTest(userModule, 3);
runTest(logoutModule, 2);
runTest(directoryModule, 19);
runTest(homeModule, 3);
runTest(featuredModule, 4 + 8*env.X_pages);
runTest(exploreModule, 4 + 8*env.X_pages);
runTest(alltapesModule, 7 + 8*env.X_pages);
runTest(signupModule, 6);
