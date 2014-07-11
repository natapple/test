var SignupTest = function(assert) {

    var moduleName = 'signup_test';
    var testResult = true;

    var testSeries = function(casper, test, start) {

        casper.on('failure', function() {
            testResult = false;
        });

        page_actions.goToSignupAction(casper, test, start, function(){
            if(assert) test.assertExists('form#new_user', 'Signup form is found');
            if(assert) test.assertExists('#user_email', 'Email input is found');
            if(assert) test.assertExists('#user_username', 'Username input is found');
            if(assert) test.assertExists('#user_password', 'Password input is found');
            if(assert) test.assertElementCount(".auth_provider", 2, "Found the 2 authentication providers");
            casper.fill('form#new_user', {
                'user[email]': 'crodordddddddrreee@lala.ru',
                'user[password]':  '123456',
                'user[username]':  'putin6'
            }, true);
        });

        casper.then(function() {
            var authProviders = this.evaluate(function() {
                var providers = $('.auth_provider');
                return providers.length;
            });
            if(authProviders == 2) { //error on signing up
                if(assert) test.assertExists('.alert.warning', 'Error on signing up');
            } else {
                if(assert) test.assertExists('.alert.success', 'Successful sign up');
            }
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

module.exports = SignupTest;
