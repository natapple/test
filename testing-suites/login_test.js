var LoginTest = function(assert) {

    var moduleName = 'login_test';
    var testResult = true;

    var testSeries = function(casper, test, start) {

        casper.on('failure', function() {
            testResult = false;
        });

        page_actions.goToLoginAction(casper, test, start, function(){
            if(assert) test.assertExists('form#new_user', 'Login form is found');
            casper.fill('form#new_user', {
                'user[email]': env.username,
                'user[password]':  env.password
            }, true);
        });

        page_actions.goToHomepageAction(casper, test, false);

        casper.then(function() {
            if(assert) this.test.assertExists('a.home_login span.has_children', 'User logged in');
        });


        casper.run(function() {
            test.done();
        });

    }

    var dependencies = [];

    return {
        testSeries : testSeries,
        moduleName : moduleName,
        testResult: testResult,
        dependencies: dependencies
    }
}

module.exports = LoginTest;
