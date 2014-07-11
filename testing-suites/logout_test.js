var LogoutTest = function(assert) {

    var moduleName = 'logout_test';
    var testResult = true;

    var testSeries = function(casper, test, start) {

        casper.on('failure', function() {
            testResult = false;
        });
        page_actions.goToHomepageAction(casper, test, start);

        casper.then(function() {
            if(assert) this.test.assertExists("#action_logout", "Logout button exists on page");
        });

        casper.then(function() {
            this.click('#action_logout');
        });

        page_actions.goToHomepageAction(casper, test, false, function() {
            if(assert) test.assertExists('#login_link', 'Login link exists on page');
        });

        casper.run(function() {
            test.done();
        });
    }

    var dependencies = ['login_test'];

    return {
        testSeries : testSeries,
        moduleName : moduleName,
        testResult: testResult,
        dependencies: dependencies
    }
}

module.exports = LogoutTest;
